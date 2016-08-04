import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Staff, Address, Availability, GeneralAvailability } from '../../model/model';
import { StaffService } from '../staff.service';
import { AddressComponent } from '../../address/address.component';
import { PersonComponent } from '../../person/person.component';
import { ValidationComponent } from '../../validation/validation.component';
import { AvailabilityComponent } from '../../availability/availability.component';
import { BadgeComponent } from '../../common/badge/badge.component';
import { CollapsibleContentComponent } from '../../common/collapsible-content/collapsible-content.component';
import { GeneralAvailabilityPipe } from '../../availability/general-availability.pipe';
import { CommonActions } from '../../person/common-actions';


@Component({
    selector: 'em-staff',
    templateUrl: './add-staff.component.html',
    directives: [PersonComponent,
        AddressComponent,
        ROUTER_DIRECTIVES,
        ValidationComponent,
        AvailabilityComponent,
        CollapsibleContentComponent,
        BadgeComponent],
    pipes: [GeneralAvailabilityPipe],
    providers: [StaffService]
})
export class AddStaffComponent extends CommonActions {

    staff: Staff;
    errors: any;
    successMsg: string;
    contractTypes: string[] = ['CONTRACT', 'BANK'];

    private staffAdd$: Subscription;

    constructor(private staffService: StaffService) {
        super(new Staff());

        this.staff = <Staff>super.person();
    }

    addStaff(staff: Staff) {
        this.staffAdd$ = this.staffService.add(staff)
            .subscribe(res => this.successMsg = `Staff ${res} successfully created`, error => this.errors = error);
    }

    ngOnDestroy() {
        if (this.staffAdd$) {
            this.staffAdd$.unsubscribe();
        }
    }

    cancel(): void {
    }

}