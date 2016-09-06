import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Appointment, Staff, Client } from '../model/model';
import { Session } from '../session/session';
import { HttpMethods } from '../common/http/http.methods';

@Injectable()
export class AppointmentService {

    private appointmentSource = new Subject<Appointment>();
    appointmentSource$ = this.appointmentSource.asObservable();

    constructor(private httpMethods: HttpMethods, private session: Session) { }

    /**
     * Fetches all active clients
     */
    fetchActiveClients(): Observable<Client[]> {
        return this.httpMethods.httpGET('/client/active');
    }

    /**
     * Fetches all active staff
     */
    fetchActiveStaff(): Observable<Staff[]> {
        return this.httpMethods.httpGET('/staff/active');
    }

    /**
     * Calls the create/update method
     */
    create(appointment: Appointment) {
        return this.httpMethods.httpPost(appointment, 'appointment/add');
    }

    /**
     * Fetches all appointments
     */
    fetchAppointments(): Observable<Appointment[]> {
        return this.httpMethods.httpGET('/appointment/all');
    }

    /**
     * Fetch appointment by id
     */
    fetchById(id: number): Observable<Appointment> {
        return this.httpMethods.httpGET(`/appointment/${id}`);
    }

    validate(appointment: Appointment): string {
        if (!appointment.fromDate || !appointment.toDate) {
            return 'Appointment time is required';
        }
    }
}