'use strict';

import {normalize} from 'path';

import {strings} from '@angular-devkit/core';
import {
  apply,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  Source,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import {camelize, classify} from '@angular-devkit/core/src/utils/strings';

import {parseStoryTemplate} from '../utils/storyTemplate';

export interface Schema {
  name: string;
  type: 'component' | 'layout';
  service: boolean;
}

/**
 * Export the generated module and service (if needed) in the public-api barrel file
 */
function updatePublicAPI(tree: Tree, options: Schema, context: SchematicContext): void {
  const buffer = tree.read('./src/public-api.ts');
  if (buffer === null) {
    context.logger.warn(
      'Wasn\'t able to find "public-api" file. You will have to update it manually.'
    );
    return;
  }
  let sourceFile = buffer.toString();
  let template = `\nexport {S${classify(options.name)}Module} from './${options.type}s/${camelize(
    options.name
  )}/module';\nexport {S${classify(options.name)}Component} from './${options.type}s/${camelize(
    options.name
  )}/component';`;
  if (options.service) {
    template += `\nexport {S${classify(options.name)}Service} from './${options.type}s/${camelize(
      options.name
    )}/service';\n`;
  } else {
    template += `\n`;
  }
  sourceFile += template;
  tree.overwrite('./src/public-api.ts', sourceFile);
}

/**
 * Create the first story for the component
 */
function createStory(tree: Tree, options: Schema): void {
  tree.create(
    `./stories/${options.type}s/${camelize(options.name)}.stories.ts`,
    parseStoryTemplate(options)
  );
}

export function stitchComponent(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const sourceTemplates = url(`./files`);
    const elementPath = normalize(`./src/${options.type}s`);

    const transformedSource: Source = apply(sourceTemplates, [
      options.service ? noop() : filter((path) => !path.endsWith('service.ts')),
      template({...options, ...strings}),
      move(elementPath)
    ]);
    updatePublicAPI(tree, options, context);
    createStory(tree, options);
    return mergeWith(transformedSource)(tree, context);
  };
}
