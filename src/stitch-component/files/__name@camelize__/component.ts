'use strict';

import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 's-<%= dasherize(name) %>',
  templateUrl: './template.html',
  styleUrls: ['./styles.less'],
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class S<%= classify(name) %>Component {}
