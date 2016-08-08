import { Component, OnDestroy, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Appointment } from '../model/model';
import { AppointmentService } from './appointment.service';
import { AddressPipe } from '../common/pipes/address.pipe';

@Component({
    selector: 'em-appointment',
    templateUrl: './appointment.component.html',
    pipes: [AddressPipe],
    directives: [ROUTER_DIRECTIVES]
})
export class AppointmentComponent implements OnInit, OnDestroy {

    appointments: Appointment[];
    private apptSub: Subscription;

    constructor(private appointmentService: AppointmentService) {}

    ngOnInit() {
        this.apptSub = this.appointmentService.fetchAppointments().subscribe(res => {
            this.appointments = res;
        });
    }

    ngOnDestroy() {
        this.apptSub.unsubscribe();
    }
}