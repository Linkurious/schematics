import * as path from 'path';

import {SchematicTestRunner} from '@angular-devkit/schematics/testing';
import {Tree} from '@angular-devkit/schematics';

const collectionPath = path.join(__dirname, '../collection.json');

describe('stitch-component', () => {
  it('create a basic component', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync('stitch-component', {name: 'test'}, Tree.empty())
      .toPromise();
    expect(tree.files.length).toEqual(5);
  });

  it('create a basic layout', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync('stitch-component', {name: 'test', type: 'layout'}, Tree.empty())
      .toPromise();
    expect(tree.files.length).toEqual(5);
    expect(tree.files[0]).toEqual('/stories/layouts/test.stories.ts');
  });

  it('add a service to the component', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync('stitch-component', {name: 'test', service: true}, Tree.empty())
      .toPromise();
    expect(tree.files.length).toEqual(6);
  });
});
