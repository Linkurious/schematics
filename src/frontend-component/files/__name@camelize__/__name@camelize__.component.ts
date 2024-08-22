import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'l-<%= dasherize(name) %>',
  templateUrl: './<%= camelize(name) %>.template.html',
  styleUrls: ['./<%= camelize(name) %>.styles.less'],
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class <%= classify(name) %>Component {}
