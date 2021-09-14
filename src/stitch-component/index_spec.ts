import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import {Schema as WorkspaceOptions} from '@schematics/angular/workspace/schema';
import {Schema as ApplicationOptions, Style} from '@schematics/angular/application/schema';
import * as path from 'path';
import {Tree} from "@angular-devkit/schematics";

const collectionPath = path.join(__dirname, '../collection.json');

const testRunner = new SchematicTestRunner('schematics', collectionPath);

const workspaceOptions: WorkspaceOptions = {
  name: 'workspace',
  newProjectRoot: 'projects',
  version: '6.0.0',
};

describe('Generate within project', () => {
  const appOptions: ApplicationOptions = {
    name: 'bar',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: Style.Less,
    skipTests: false,
    skipPackageJson: false,
  };

  let appTree: UnitTestTree;
  beforeEach(async () => {
    appTree = await testRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions).toPromise();
    appTree = await testRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree).toPromise();
  });

  it('Generate the default files', async () => {
    const tree = await testRunner.runSchematicAsync('stitch-component', {name: "test"}, Tree.empty()).toPromise();
    expect(tree.files.every(f => f.match(/\/components\/test\/./))).toBe(true);
    expect(tree.files.length).toBe(4);
  });

  it('add the service to the component if needed', async () => {
    const tree = await testRunner.runSchematicAsync('stitch-component', {name: "test", service: true}, Tree.empty()).toPromise();
    expect(tree.files.findIndex(f => f === '/components/test/service.ts')).toBeGreaterThan(0);
    expect(tree.files.length).toBe(5);
  });

  it('generate a components in the layout folder', async () => {
    const tree = await testRunner.runSchematicAsync('stitch-component', {name: "test", type: 'layout'}, Tree.empty()).toPromise();
    expect(tree.files.every(f => f.match(/\/layouts\/test\/./))).toBe(true);
  });
});
