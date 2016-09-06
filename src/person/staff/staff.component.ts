import { Component } from '@angular/core';
import { StaffService } from './staff.service';
import { StaffListComponent } from './staff-list/staff-list.component';

@Component({
    selector: 'em-staff',
    templateUrl: './staff.component.html',
    directives: [StaffListComponent],
    providers: [StaffService]
})
export class StaffComponent {
}