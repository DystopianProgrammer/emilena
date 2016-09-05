import { Component, OnInit } from '@angular/core';

import { AlertsService } from './alerts.service';
import { Appointment, Alerts } from '../model/model';

import { Session } from '../session/session';
import { AddressPipe } from '../common/pipes/address.pipe';
import { DatePipe } from '../common/pipes/date.pipe';

@Component({
    selector: 'em-alerts',
    templateUrl: './alerts.component.html',
    pipes: [AddressPipe]
})
export class AlertsComponent implements OnInit {

    alerts: Alerts = new Alerts();
    user: string;

    constructor(private alertsService: AlertsService, private session: Session) { }

    public ngOnInit() {
        let staff = this.session.sessionUser().staff;
        if (staff) {
            this.user = staff.forename;
            this.alertsService.pendingAppointmentsByStaffId(staff.id)
                .subscribe(res => this.alerts = res);
        }
    }
}