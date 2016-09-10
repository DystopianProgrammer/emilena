import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Client, Staff, Address, Appointment, Availability } from '../../model/model';
import { AppointmentService } from '../appointment.service';
import { AddressComponent } from '../../address/address.component';
import { CollapsibleContentComponent } from '../../common/collapsible-content/collapsible-content.component';
import { AvailabilityService } from '../../availability/availability.service';
import { AvailabilityComponent } from '../../availability/availability.component';
import { BadgeComponent } from '../../common/badge/badge.component';
import { LoaderService } from '../../common/loader/loader.service';
import { DatePipe } from '../../common/pipes/date.pipe.ts'
import { AbstractAppointment } from '../appointment.abstract';

@Component({
    selector: 'em-edit-appointment',
    directives: [AddressComponent, CollapsibleContentComponent, AvailabilityComponent, BadgeComponent],
    pipes: [DatePipe],
    templateUrl: './edit-appointment.component.html'
})
export class EditAppointmentComponent extends AbstractAppointment {

    updateStaff: boolean = false;
    updateClient: boolean = false;

    constructor(
        appointmentService: AppointmentService,
        route: ActivatedRoute,
        loaderService: LoaderService,
        availabilityService: AvailabilityService,
        router: Router) {
        super(appointmentService, route, loaderService, availabilityService, router);
    }

    showStaffSelect() {
        this.updateStaff = !this.updateStaff;
    }

    showClientSelect() {
        this.updateClient = !this.updateClient;
    }
}