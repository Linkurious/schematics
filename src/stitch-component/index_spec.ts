'use strict';

import 'mocha';
import * as path from 'path';

import {expect} from 'chai';
import {SchematicTestRunner} from '@angular-devkit/schematics/testing';
import {Tree} from '@angular-devkit/schematics';

const collectionPath = path.join(__dirname, '../collection.json');

describe('stitch-component', () => {
  it('create a basic component', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematic('stitch-component', {name: 'test'}, Tree.empty());
    expect(tree.files.length).to.eql(4);
  });

  it('add a service to the component', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematic(
      'stitch-component',
      {name: 'test', service: true},
      Tree.empty()
    );
    expect(tree.files.length).to.eql(5);
  });
});
