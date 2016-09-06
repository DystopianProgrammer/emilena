import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../../authentication/authentication.service';
import { Staff, Client } from '../../model/model';
import { Session } from '../../session/session';
import { HttpMethods } from '../../common/http/http.methods';

@Injectable()
export class StaffService {

    constructor(private httpMethods: HttpMethods, private session: Session) { }

    /**
     * List all staff
     */
    findAll(): Observable<Staff[]> {
        return this.httpMethods.httpGET('/staff/all');
    }

    /**
     * List clients by staff
     */
    listClientsByStaff(staff: Staff): Observable<Client[]> {
        return this.httpMethods.httpGET(`/staff/clients/${staff.id}`);
    }

    /**
     * Find staff member by id
     */
    findById(id: number): Observable<Staff> {
        return this.httpMethods.httpGET(`/staff/${id}`);
    }

    /**
     * Creates a new staff member
     */
    add(person: Staff): Observable<Staff> {
        return this.httpMethods.httpPost(person, 'staff/add');
    }

    /**
     * Updates an existing staff member
     */
    update(person: Staff) {
        return this.httpMethods.httpPost(person, '/staff/update');
    }

}