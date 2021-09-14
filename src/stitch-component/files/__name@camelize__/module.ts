'use strict';

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {S<%= classify(name) %>Component} from './component';
<% if(service) { %>import {S<%= classify(name) %>Service} from './service';<% } %>

@NgModule({
    imports: [CommonModule],
    declarations: [S<%= classify(name) %>Component],
    exports: [S<%= classify(name) %>Component]<% if(service) { %>,<% } %>
<% if(service) { %>    providers: [S<%= classify(name) %>Service]<% } %>
})
export class S<%= classify(name) %>Module {}


