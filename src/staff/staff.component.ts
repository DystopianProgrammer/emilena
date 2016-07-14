import { Component, OnInit, OnDestroy } from '@angular/core';

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
    private staffAdd$: Subscription;
    private staffFetchAll$: Subscription;

    constructor(private staffService: StaffService) {
        this.staffActionBtn = this.DEFAULT_BTN_VALUE;
    }

    toggleStaffForm() {
        this.isEditMode = !this.isEditMode;
        this.staffActionBtn = (this.isEditMode) ? 'View staff availability' : this.DEFAULT_BTN_VALUE;
        if (this.isEditMode) {
            this.staff = this.initStaff();
        }
    }

    addStaff(staff: Staff) {
        this.staffAdd$ = this.staffService.addStaff(staff)
            .subscribe(staff => this.staffList.push(staff), error => this.errorMessage = <any>error);

        this.toggleStaffForm();
    }

    editStaff(staff: Staff): any {
    }

    removeStaff(staff: Staff): void {
    }

    ngOnInit() {
        this.getStaff();
    }

    ngOnDestroy() {
        if (this.staffAdd$) {
            this.staffAdd$.unsubscribe();
        }

        if(this.staffFetchAll$) {
            this.staffFetchAll$.unsubscribe();
        }
    }

    private getStaff(): void {
        this.staffFetchAll$ = this.staffService.findAll().subscribe(
            staffList => {this.staffList = staffList},
            error => this.errorMessage = <any>error)
    }

    private initStaff(): Staff {
        let staff = new Staff();
        staff.address = new Address();
        return staff;
    }
}