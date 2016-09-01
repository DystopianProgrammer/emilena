import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../../authentication/authentication.service';
import { Staff, Client } from '../../model/model';
import { Session } from '../../session/session';

@Injectable()
export class StaffService {

    constructor(private http: Http, private session: Session) {
    }

    /**
     * List all staff
     */
    findAll(): Observable<Staff[]> {
        let headers = this.session.secureHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get('/staff/all', options)
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }

    /**
     * List clients by staff
     */
    listClientsByStaff(staff: Staff): Observable<Client[]> {
        let headers = this.session.secureHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(`/staff/clients/${staff.id}`, options)
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }

    /**
     * Find staff member by id
     */
    findById(id: number): Observable<Staff> {
        let headers = this.session.secureHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(`/staff/${id}`, options)
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }

    /**
     * Creates a new staff member
     */
    add(person: Staff): Observable<Staff> {
        return this.operation(person, 'staff/add');
    }

    /**
     * Updates an existing staff member
     */
    update(person: Staff) {
        return this.operation(person, '/staff/update');
    }

    private operation(person: Staff, url: string): Observable<Staff> {
        let body = JSON.stringify(person);
        let headers = this.session.secureHeaders();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }
}