const testFunction = jest.fn();

import { <%= classify(name) %>Controller } from './<%= camelize(name) %>.controller';

jest.mock('src/app/utilities/decorators/selector.ts', () => ({
  selectStoreSignal: testFunction
}));

describe('<%= classify(name) %>Controller', () => {
  let <%= camelize(name) %>Controller: <%= classify(name) %>Controller;

  beforeEach(async () => {
    <%= camelize(name) %>Controller = new <%= classify(name) %>Controller();
  });

  it('should create', () => {
    expect(<%= camelize(name) %>Controller).toBeTruthy();
  });
});
