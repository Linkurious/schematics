const testFunction = jest.fn();

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= classify(name) %>Component } from './<%= camelize(name) %>.component';

jest.mock('src/app/utilities/decorators/selector.ts', () => ({
  selectStoreSignal: testFunction
}));

describe('<%= classify(name) %>Component', () => {
  let component: <%= classify(name) %>Component;
  let fixture: ComponentFixture<<%= classify(name) %>Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [<%= classify(name) %>Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(<%= classify(name) %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
