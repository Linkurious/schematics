const testFunction = jest.fn();

import { <%= classify(name) %>Service } from './<%= camelize(name) %>.service';

jest.mock('src/app/utilities/decorators/selector.ts', () => ({
  selectStoreSignal: testFunction
}));

describe('<%= classify(name) %>Service', () => {
  let <%= camelize(name) %>Service: <%= classify(name) %>Service;

  beforeEach(async () => {
    <%= camelize(name) %>Service = new <%= classify(name) %>Service();
  });

  it('should create', () => {
    expect(<%= camelize(name) %>Service).toBeTruthy();
  });
});
