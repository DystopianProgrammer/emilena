import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Alerts } from '../model/model';
import { HttpMethods } from '../common/http/http.methods';

@Injectable()
export class AlertsService {

    private alertsSubject = new Subject<Alerts>();
    alertsObservable$ = this.alertsSubject.asObservable();

    constructor(private httpMethods: HttpMethods) { }

    pendingAppointmentsByStaffId(id: number): Observable<Alerts> {
        if (id) {
            return this.httpMethods.httpGET(`/alerts/staff/${id}/appointments`);
        } else {
            return Observable.of(new Alerts());
        }
    }

    notify(alerts: Alerts): void {
        this.alertsSubject.next(alerts);
    }
}