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
export class AddStaffComponent {

    staff: Staff;
    errors: any;
    successMsg: string;
    contractTypes: string[] = ['CONTRACT', 'BANK'];
    availability: Availability;
    showAvailabilityForm: boolean = false;
    active = true;

    private staffAdd$: Subscription;

    constructor(private staffService: StaffService) {
        this.initStaff();
    }

    addStaff(staff: Staff) {
        this.staffAdd$ = this.staffService.addStaff(staff)
            .subscribe(res => {
                this.successMsg = `Staff ${res} successfully created`;
            }, error => {
                this.errors = error;
                setTimeout(() => {
                    this.errors = undefined;
                }, 5000);
            });

        this.active = false;
        setTimeout(() => this.active = true, 0);
        this.initStaff();
    }

    addAvailability(staff: Staff) {
        this.availability = new Availability();
        this.showAvailabilityForm = true;
    }

    availabilityUpdated(availability: Availability) {
        if (availability.date) {
            this.staff.availability.push(availability);
        }
        this.showAvailabilityForm = false;
    }

    generalAvailabilityUpdated(generalAvailability: GeneralAvailability) {
        this.showAvailabilityForm = false;
        this.staff.generalAvailability = generalAvailability;
    }

    removeAvailability(index: number) {
        this.staff.availability.splice(index, 1);
    }

    ngOnDestroy() {
        if (this.staffAdd$) {
            this.staffAdd$.unsubscribe();
        }
    }

    cancel(): void {
        this.initStaff();
    }

    private initStaff(): void {
        this.staff = new Staff();
        this.staff.address = new Address();
        this.staff.availability = [];
    }
}