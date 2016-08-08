import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { Staff, Address, Availability, GeneralAvailability } from '../../../model/model';
import { StaffService } from '../staff.service';
import { AddressComponent } from '../../../address/address.component';
import { PersonComponent } from '../../../person/person.component';
import { ValidationComponent } from '../../../validation/validation.component';
import { AvailabilityService } from '../../../availability/availability.service';
import { AvailabilityComponent } from '../../../availability/availability.component';
import { BadgeComponent } from '../../../common/badge/badge.component';
import { CollapsibleContentComponent } from '../../../common/collapsible-content/collapsible-content.component';
import { CommonActions } from '../../../person/common-actions';
import { ArrayDelimiter } from '../../../common/pipes/array-delimiter';
import { GeneralAvailabilityPipe } from '../../../common/pipes/general-availability.pipe';

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
    pipes: [GeneralAvailabilityPipe, ArrayDelimiter],
    providers: [StaffService]
})
export class AddStaffComponent extends CommonActions {

    errors: any;
    successMsg: string;
    contractTypes: string[] = ['CONTRACT', 'BANK'];
    staffTypes: string[] = ['SENIOR', 'SUPPORT'];

    constructor(private staffService: StaffService,
                private availabilityService: AvailabilityService,
                private router: Router) {

        super(new Staff());

        this.availabilityService.cancelAvailabilityForm$.subscribe(event => super.cancelAvailability(event));
    }

    addStaff(staff: Staff) {
        this.staffService.add(staff)
            .subscribe(res => {
                this.successMsg = `Staff ${res} successfully created`;
                this.router.navigate(['/staff']);
            }, error => this.errors = error);
    }
}