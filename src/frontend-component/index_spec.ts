import 'mocha';
import * as path from 'path';

import {expect} from 'chai';
import {SchematicTestRunner} from '@angular-devkit/schematics/testing';
import {Tree} from '@angular-devkit/schematics';

const collectionPath = path.join(__dirname, '../collection.json');

describe('frontend-component', () => {
  it('create a basic component', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync('frontend-component', {name: 'test'}, Tree.empty())
      .toPromise();
    expect(tree.files).to.eql([
      '/test/test.component.spec.ts',
      '/test/test.component.ts',
      '/test/test.styles.less',
      '/test/test.template.html'
    ]);
  });

  it('Should generate the correct content for component file', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync(
        'frontend-component',
        {name: 'test', service: true, controller: true},
        Tree.empty()
      )
      .toPromise();
    expect(tree.read('/test/test.component.ts')?.toString()).to.eql(
      "import {ChangeDetectionStrategy, Component} from '@angular/core';\n" +
        '\n' +
        '@Component({\n' +
        "  selector: 'l-test',\n" +
        "  templateUrl: './test.template.html',\n" +
        "  styleUrls: ['./test.styles.less'],\n" +
        '  standalone: true,\n' +
        '  imports: [],\n' +
        '  changeDetection: ChangeDetectionStrategy.OnPush,\n' +
        '  preserveWhitespaces: false\n' +
        '})\n' +
        'export class TestComponent {}\n'
    );
  });

  it('Should generate the correct content for component test file', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync(
        'frontend-component',
        {name: 'test', service: true, controller: true},
        Tree.empty()
      )
      .toPromise();
    expect(tree.read('/test/test.component.spec.ts')?.toString()).to.eql(
      'const testFunction = jest.fn();\n' +
        '\n' +
        "import { ComponentFixture, TestBed } from '@angular/core/testing';\n" +
        '\n' +
        "import { TestComponent } from './test.component';\n" +
        '\n' +
        "jest.mock('src/app/utilities/decorators/selector.ts', () => ({\n" +
        '  selectStoreSignal: testFunction\n' +
        '}));\n' +
        '\n' +
        "describe('TestComponent', () => {\n" +
        '  let component: TestComponent;\n' +
        '  let fixture: ComponentFixture<TestComponent>;\n' +
        '\n' +
        '  beforeEach(async () => {\n' +
        '    await TestBed.configureTestingModule({\n' +
        '      imports: [TestComponent]\n' +
        '    })\n' +
        '    .compileComponents();\n' +
        '\n' +
        '    fixture = TestBed.createComponent(TestComponent);\n' +
        '    component = fixture.componentInstance;\n' +
        '    fixture.detectChanges();\n' +
        '  });\n' +
        '\n' +
        "  it('should create', () => {\n" +
        '    expect(component).toBeTruthy();\n' +
        '  });\n' +
        '});\n'
    );
  });

  it('Should generate the correct content for styles file', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync(
        'frontend-component',
        {name: 'test', service: true, controller: true},
        Tree.empty()
      )
      .toPromise();

    expect(tree.read('/test/test.styles.less')?.toString()).to.eql(
      '/*@import "@linkurious/stitch/assets/tokens/animations";  */\n' +
        '/*@import "@linkurious/stitch/assets/tokens/colors";  */\n' +
        '/*@import "@linkurious/stitch/assets/tokens/spacing";  */\n' +
        '/*@import "@linkurious/stitch/assets/tokens/typography";  */\n' +
        '/*@import "@linkurious/stitch/assets/tokens/utils";  */\n' +
        '\n' +
        ':host {\n' +
        '  box-sizing: border-box;\n' +
        '\n' +
        '  *,\n' +
        '  *:before,\n' +
        '  *:after {\n' +
        '    box-sizing: inherit;\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        '.l-test {\n' +
        '\n' +
        '}\n'
    );
  });

  it('Should generate the correct content for template file', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync(
        'frontend-component',
        {name: 'test', service: true, controller: true},
        Tree.empty()
      )
      .toPromise();

    expect(tree.read('/test/test.template.html')?.toString()).to.eql(
      '<div class="l-test">\n' + '\n' + '</div>\n'
    );
  });

  it('create a component with service', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync('frontend-component', {name: 'test', service: true}, Tree.empty())
      .toPromise();
    expect(tree.files).to.eql([
      '/test/test.component.spec.ts',
      '/test/test.component.ts',
      '/test/test.service.ts',
      '/test/test.styles.less',
      '/test/test.template.html'
    ]);
    expect(tree.read('/test/test.service.ts')?.toString()).to.eql(
      "import {Injectable} from '@angular/core';\n" +
        '\n' +
        '@Injectable({\n' +
        "  providedIn: 'root'\n" +
        '})\n' +
        'export class TestService {}\n'
    );
  });

  it('create a component with controller', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync('frontend-component', {name: 'test', controller: true}, Tree.empty())
      .toPromise();
    expect(tree.files).to.eql([
      '/test/test.component.spec.ts',
      '/test/test.component.ts',
      '/test/test.controller.ts',
      '/test/test.styles.less',
      '/test/test.template.html'
    ]);
    expect(tree.read('/test/test.controller.ts')?.toString()).to.eql(
      "import {Injectable} from '@angular/core';\n" +
        '\n' +
        '@Injectable({\n' +
        "  providedIn: 'root'\n" +
        '})\n' +
        'export class TestController {}\n'
    );
  });
});
