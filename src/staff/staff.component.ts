import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Staff } from '../model/person';
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
export class StaffComponent implements OnDestroy {

    staff: Staff;
    errorMessage: string;
    staffList: Staff[];
    isEditMode: boolean;
    staffActionBtn: string;

    private DEFAULT_BTN_VALUE: string = 'Add staff member';
    private staffSubscriber$: Subscription;

    constructor(private staffService: StaffService) {
        this.staffActionBtn = this.DEFAULT_BTN_VALUE;
    }

    toggleStaffForm() {
        this.isEditMode = !this.isEditMode;
        this.staffActionBtn = (this.isEditMode) ? 'View staff availability' : this.DEFAULT_BTN_VALUE;
        this.staff = (this.isEditMode) ? new Staff() : null;
    }

    addStaff(staff: Staff) {
        this.staffSubscriber$ = this.staffService.addStaff(staff)
            .subscribe(
            staff => this.staffList.push(staff),
            error => this.errorMessage = <any>error);
    }

    editStaff(staff: Staff): any {
    }

    removeStaff(staff: Staff): void {
    }

    ngOnDestroy() {
        if(this.staffSubscriber$) {
            this.staffSubscriber$.unsubscribe();
        }
    }
}