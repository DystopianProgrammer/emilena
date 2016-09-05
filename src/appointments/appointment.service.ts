import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Appointment, Staff, Client } from '../model/model';
import { Session } from '../session/session';

@Injectable()
export class AppointmentService {

    private appointmentSource = new Subject<Appointment>();
    appointmentSource$ = this.appointmentSource.asObservable();

    constructor(private http: Http, private session: Session) {
    }

    /**
     * Fetches all active clients
     */
    fetchActiveClients(): Observable<Client[]> {
        let headers = this.session.secureHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get('/client/active', options)
            .map(res => res.json() || [])
            .catch(error => Observable.throw(error._body));
    }

    /**
     * Fetches all active staff
     */
    fetchActiveStaff(): Observable<Staff[]> {
        let headers = this.session.secureHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get('/staff/active', options)
            .map(res => res.json() || [])
            .catch(err => (Observable.throw(err._body)));
    }

    /**
     * Calls the create/update method
     */
    create(appointment: Appointment) {
        let body = JSON.stringify(appointment);
        let headers = this.session.secureHeaders();
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
        let headers = this.session.secureHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get('/appointment/all', options)
            .map(res => res.json() || [])
            .catch(err => (Observable.throw(err._body)));
    }

    /**
     * Fetch appointment by id
     */
    fetchById(id: number): Observable<Appointment> {
        let headers = this.session.secureHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(`/appointment/${id}`, options)
            .map(res => res.json() || {})
            .catch(err => Observable.throw(err._body));
    }

    validate(appointment: Appointment): string {
        if (!appointment.fromDate || !appointment.toDate) {
            return 'Appointment time is required';
        }
    }
}