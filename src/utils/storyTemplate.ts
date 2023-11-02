import {camelize, capitalize, classify, dasherize} from '@angular-devkit/core/src/utils/strings';

import {Schema} from '../stitch-component';

export const parseStoryTemplate = function (options: Schema): string {
  return `
import {moduleMetadata} from '@storybook/angular';

import {S${classify(options.name)}Component} from '../../src/components/${camelize(
    options.name
  )}/component';

export default {
    title: '${capitalize(options.name)}',
    component: S${classify(options.name)}Component,
    decorators: [
        moduleMetadata({
            imports: [S${classify(options.name)}Component]
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
