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

export interface FrontendSchema {
  name: string;
  type: 'component' | 'popin';
  service: boolean;
  controller: boolean;
  path: string;
}

export function frontendComponent(options: FrontendSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const sourceTemplates = url(`./files`);
    const elementPath = normalize(`./${__dirname}`);

    const transformedSource: Source = apply(sourceTemplates, [
      options.service
        ? noop()
        : filter((path) => !(path.endsWith('service.ts') || path.endsWith('service.spec.ts'))),
      options.controller
        ? noop()
        : filter(
            (path) => !(path.endsWith('controller.ts') || path.endsWith('controller.spec.ts'))
          ),
      template({...options, ...strings}),
      move(elementPath)
    ]);
    return mergeWith(transformedSource)(tree, context);
  };
}
