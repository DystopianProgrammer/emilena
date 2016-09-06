import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Appointment } from '../model/model';
import { AppointmentService } from './appointment.service';
import { AddressPipe } from '../common/pipes/address.pipe';
import { LoaderService } from '../common/loader/loader.service';
import { DatePipe } from '../common/pipes/date.pipe.ts';

@Component({
    selector: 'em-appointment',
    templateUrl: './appointment.component.html',
    pipes: [AddressPipe, DatePipe]
})
export class AppointmentComponent implements OnInit, OnDestroy {

    appointments: Appointment[];
    private apptSub: Subscription;

    constructor(private appointmentService: AppointmentService, private loaderService: LoaderService) {}

    ngOnInit() {
        this.loaderService.notifyIsLoaded(false);
        this.apptSub = this.appointmentService.fetchAppointments().subscribe(res => {
            this.appointments = res;
            this.loaderService.notifyIsLoaded(true);
        });
    }

    ngOnDestroy() {
        this.apptSub.unsubscribe();
    }
}