import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { StaffService } from './staff.service';
import { StaffListComponent } from './staff-list/staff-list.component';

@Component({
    selector: 'em-staff',
    templateUrl: './staff.component.html',
    styles:  [String(require('./staff.component.less'))],
    directives: [StaffListComponent, ROUTER_DIRECTIVES],
    providers: [StaffService]
})
export class StaffComponent {
}