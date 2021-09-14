'use strict';

import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 's-<%= dasherize(name) %>',
    template: './template.html',
    styleUrls: ['./styles.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class S<%= classify(name) %>Component {
}
