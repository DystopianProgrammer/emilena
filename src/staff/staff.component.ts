import { Component } from '@angular/core';
import { Staff, Senior, SupportWorker } from '../model/staff';
import { Address } from '../model/address';
import { StaffService } from './staff.service';
import { PersonComponent } from '../person/person.component';
import { AddressComponent } from '../address/address.component';
import { ContractTypeComponent } from '../contract-type/contract-type.component';

@Component({
    selector: 'em-staff',
    templateUrl: './staff.component.html',
    directives: [PersonComponent, AddressComponent, ContractTypeComponent],
    providers: [StaffService]
})
export class StaffComponent {

    staff: Staff;
    isEditMode: boolean;
    staffActionBtn: string;

    private DEFAULT_BTN_VALUE: string = 'Add staff member';

    constructor(private staffService: StaffService) {
        this.staffActionBtn = this.DEFAULT_BTN_VALUE;
    }

    toggleStaffForm() {
        this.isEditMode = !this.isEditMode;
        this.staffActionBtn = (this.isEditMode) ? 'View staff availability' : this.DEFAULT_BTN_VALUE;
        console.log(this.staffActionBtn);
    }

    addStaff(): void {
    }

    editStaff(staff: Staff): any {
    }

    removeStaff(staff: Staff): void {
    }
}