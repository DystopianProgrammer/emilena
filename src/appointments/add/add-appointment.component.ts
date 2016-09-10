import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { Client, Staff, Address, Appointment, Availability } from '../../model/model';
import { AppointmentService } from '../appointment.service';
import { AddressComponent } from '../../address/address.component';
import { CollapsibleContentComponent } from '../../common/collapsible-content/collapsible-content.component';
import { AvailabilityService } from '../../availability/availability.service';
import { AvailabilityComponent } from '../../availability/availability.component';
import { BadgeComponent } from '../../common/badge/badge.component';
import { LoaderService } from '../../common/loader/loader.service';
import { DatePipe } from '../../common/pipes/date.pipe.ts';
import { AbstractAppointment } from '../appointment.abstract';

@Component({
    selector: 'em-add-appointment',
    directives: [AddressComponent, CollapsibleContentComponent, AvailabilityComponent, BadgeComponent],
    pipes: [DatePipe],
    templateUrl: './add-appointment.component.html'
})
export class AddAppointmentComponent extends AbstractAppointment {

    constructor(
        appointmentService: AppointmentService,
        route: ActivatedRoute,
        loaderService: LoaderService,
        availabilityService: AvailabilityService,
        router: Router) {
        super(appointmentService, route, loaderService, availabilityService, router);

        this.initAppt();
    }

    clear(): void {
        this.initAppt();
    }

    private initAppt() {
        this.appointment = new Appointment();
        this.appointment.location = new Address();
    }
}