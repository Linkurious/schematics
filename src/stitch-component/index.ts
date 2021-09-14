import {
    apply,
    filter,
    mergeWith,
    move,
    noop,
    Rule,
    SchematicContext, SchematicsException, Source,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import {Schema} from "./schema";
import {strings} from "@angular-devkit/core";
import {normalize} from "path";
import {camelize, classify} from "@angular-devkit/core/src/utils/strings";
import {parseStoryTemplate} from "../utils/storyTemplate";


export function stitchComponent(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const sourceTemplates = url(`./files`);
    const elementPath = normalize(`${options.type}s`);

    let transformedSource: Source = apply(sourceTemplates, [
        options.service ? noop() : filter(path => !path.endsWith('service.ts')),
        template({...options, ...strings}),
        move(elementPath)
    ]);
      updatePublicAPI(tree, options);
      createStory(tree, options);
      return mergeWith(transformedSource)(tree, context)

  };
}

/**
 * Export the generated module and service (if needed) in the public-api barrel file
 */
function updatePublicAPI(tree: Tree, options: Schema): void {
    const buffer = tree.read('public-api.ts');
    if (buffer === null){
        throw new SchematicsException('file not found');
    }
    let sourceFile = buffer.toString();
    let template = `export {S${classify(options.name)}Module} from './${options.type}s/${camelize(options.name)}/module';`;
    if(options.service) {
        template += `\nexport {S${classify(options.name)}Service} from './${options.type}s/${camelize(options.name)}/service';`;
    }
    sourceFile += template;
    tree.overwrite('public-api.ts', sourceFile);
}

function createStory(tree: Tree, options: Schema): void {
    tree.create(`./stories/${options.type}s/${camelize(options.name)}.stories.ts`, parseStoryTemplate(options));
}
