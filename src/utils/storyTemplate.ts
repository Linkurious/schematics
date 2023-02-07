import {camelize, capitalize, classify, dasherize} from '@angular-devkit/core/src/utils/strings';

import {Schema} from '../stitch-component';

export const parseStoryTemplate = function (options: Schema): string {
  return `
import {moduleMetadata} from '@storybook/angular';
import {withA11y} from '@storybook/addon-a11y';

import {S${classify(options.name)}Module} from '../../src/components/${camelize(
    options.name
  )}/module';
import {S${classify(options.name)}Component} from '../../src/components/${camelize(
    options.name
  )}/component';

export default {
    title: '${capitalize(options.name)}',
    component: S${classify(options.name)}Component
    decorators: [
        withA11y,
        moduleMetadata({
            imports: [S${classify(options.name)}Module]
        })
    ]
};

export const firstStory = () => ({
    template: \`
      <s-${dasherize(options.name)}></s-${dasherize(options.name)}>
    \`
});

firstStory.story = {
  name: '${classify(options.name)} first story'
};`;
};
