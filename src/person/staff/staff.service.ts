import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Staff, Client, User } from '../../model/model';

@Injectable()
export class StaffService {

    private user: User;

    constructor(private http: Http, private authenticationService: AuthenticationService) {
        this.authenticationService.userObservable$.subscribe(user => this.user = user);
    }

    /**
     * List all staff
     */
    findAll(): Observable<Staff[]> {
        return this.http.get('/staff/all')
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }

    /**
     * List clients by staff
     */
    listClientsByStaff(staff: Staff): Observable<Client[]> {
        return this.http.get(`/staff/clients/${staff.id}`)
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }

    /**
     * Find staff member by id
     */
    findById(id: number): Observable<Staff> {
        return this.http.get(`/staff/${id}`)
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

        let headers = this.authenticationService.secureHeader(this.user);
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }
}