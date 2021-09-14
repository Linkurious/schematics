import {camelize, capitalize, classify, dasherize} from "@angular-devkit/core/src/utils/strings";
import {Schema} from "../stitch-component/schema";

export const parseStoryTemplate = function(options: Schema): string {
    return `
import {moduleMetadata} from '@storybook/angular';
import {withA11y} from '@storybook/addon-a11y';

import {S${classify(options.name)}Module} from '../../src/components/${camelize(options.name)}/module';

export default {
    title: '${capitalize(options.name)}',

    decorators: [
        withA11y,
        moduleMetadata({
            imports: [S${classify(options.name)}Module]
        })
    ]
};

export const firstStory = () => ({
    template: \`
      <s-${dasherize(options.name)}></s-tooltip>
    \`
});

firstStory.story = {
  name: '${classify(options.name)} first story'
};`
};