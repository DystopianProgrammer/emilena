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

    fetchActiveClients(): Observable<Client> {
        let user = this.authenticationService.authenticatedUser;
        let headers = this.authenticationService.secureHeader(user.encryptedCredentials);
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http.get('/client/active', options)
                .map(res => res.json())
                .catch(err => (Observable.throw(err._body)));
    }

    fetchActiveStaff(): Observable<Staff> {
        let user = this.authenticationService.authenticatedUser;
        let headers = this.authenticationService.secureHeader(user.encryptedCredentials);
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http.get('/staff/active', options)
                .map(res => res.json())
                .catch(err => (Observable.throw(err._body)));
    }

    create(appointment: Appointment) {
    }

    edit(appointment: Appointment) {
    }
}