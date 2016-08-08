import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Appointment, Staff, Client } from '../model/model';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AppointmentService {

    private appointmentSource = new Subject<Appointment>();
    appointmentSource$ = this.appointmentSource.asObservable();

    constructor(private http: Http, private authenticationService: AuthenticationService) { }

    /**
     * Fetches all active clients
     */
    fetchActiveClients(): Observable<Client[]> {
        return this.http.get('/client/active')
            .map(res => res.json() || [])
            .catch(error => Observable.throw(error._body));
    }

    /**
     * Fetches all active staff
     */
    fetchActiveStaff(): Observable<Staff[]> {
        return this.http.get('/staff/active')
                .map(res => res.json() || [])
                .catch(err => (Observable.throw(err._body)));
    }

    /**
     * Calls the create/update method
     */
    create(appointment: Appointment) {
        let body = JSON.stringify(appointment);
        let user = this.authenticationService.authenticatedUser;
        let headers = this.authenticationService.secureHeader(user.encryptedCredentials);
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({ headers: headers });

        return this.http.post('appointment/add', body, options)
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }

    /**
     * Fetches all appointments
     */
    fetchAppointments(): Observable<Appointment[]> {
        return this.http.get('/appointment/all')
                .map(res => res.json() || [])
                .catch(err => (Observable.throw(err._body)));
    }

}