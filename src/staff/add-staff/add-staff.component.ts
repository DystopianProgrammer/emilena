import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Staff, Address, Availability } from '../../model/model';
import { StaffService } from '../staff.service';
import { AddressComponent } from '../../address/address.component';
import { PersonComponent } from '../../person/person.component';
import { ValidationComponent } from '../../validation/validation.component';
import { AvailabilityComponent } from '../../availability/availability.component';
import { BadgeComponent } from '../../badge/badge.component';


@Component({
    selector: 'em-staff',
    templateUrl: './add-staff.component.html',
    directives: [PersonComponent,
        AddressComponent,
        ROUTER_DIRECTIVES,
        ValidationComponent,
        AvailabilityComponent,
        BadgeComponent],
    providers: [StaffService]
})
export class AddStaffComponent {

    staff: Staff;
    errors: any;
    successMsg: string;
    contractTypes: string[] = ['CONTRACT', 'BANK'];
    availabilities: Availability[] = [];
    availability: Availability;
    showAvailabilityForm: boolean = false;

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
                }, 10000);
            });

        this.initStaff();
    }

    addAvailability(staff: Staff) {
        if (this.staff.availability) {
            this.availabilities = this.staff.availability;
        } else {
            this.staff.availability = this.availabilities;
        }
        this.availability = new Availability();

        this.showAvailabilityForm = true;
    }

    availabilityUpdated(event: any) {
        this.availabilities.push(event);
        this.showAvailabilityForm = false;
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
    }
}