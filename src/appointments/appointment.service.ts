import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Appointment, Staff, Client } from '../model/model';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AppointmentService {

    private appointmentSource = new Subject<Appointment>();
    appointmentSource$ = this.appointmentSource.asObservable();

    constructor(private http: Http, private authenticationService: AuthenticationService) { }

    fetchActiveClients(): Observable<Client[]> {
        return this.http.get('/client/active')
            .map(res => res.json() || [])
            .catch(error => Observable.throw(error._body));
    }

    fetchActiveStaff(): Observable<Staff[]> {
        return this.http.get('/staff/active')
                .map(res => res.json() || [])
                .catch(err => (Observable.throw(err._body)));
    }

    create(appointment: Appointment) {
    }

    edit(appointment: Appointment) {
    }
}