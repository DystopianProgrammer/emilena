import { Component, OnInit } from '@angular/core';

import { AlertsService } from './alerts.service';
import { Alerts, Appointment } from '../model/model';
import { AppointmentService } from '../appointments/appointment.service';

import { Session } from '../session/session';
import { AddressPipe } from '../common/pipes/address.pipe';
import { DatePipe } from '../common/pipes/date.pipe';

@Component({
    selector: 'em-alerts',
    templateUrl: './alerts.component.html',
    pipes: [AddressPipe, DatePipe]
})
export class AlertsComponent implements OnInit {

    alerts: Alerts = new Alerts();
    user: string;

    constructor(private alertsService: AlertsService,
        private appointmentService: AppointmentService,
        private session: Session) { }

    public ngOnInit() {
        let staff = this.session.sessionUser().staff;
        if (staff) {
            this.user = staff.forename;
            this.alertsService.pendingAppointmentsByStaffId(staff.id)
                .subscribe(res => this.alerts = res);
        }
    }

    complete(appointment: Appointment) {
        appointment.isComplete = true;
        this.appointmentService.create(appointment).subscribe(res => {
            this.alertsService.notify(this.alerts);
        });
    }
}