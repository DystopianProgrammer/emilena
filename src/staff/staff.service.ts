import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication/authentication.service';

import { Staff, Client } from '../model/model';

@Injectable()
export class StaffService {

    constructor(private http: Http, private authenticationService: AuthenticationService) { }

    /**
     * Create new staff member
     */
    add(staff: Staff): Observable<Staff> {
        let body = JSON.stringify(staff);

        let user = this.authenticationService.authenticatedUser;
        let headers = this.authenticationService.secureHeader(user.encryptedCredentials);
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({ headers: headers });

        return this.http.post('/staff/add', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Edit existing staff member
     */
    edit(staff: Staff) {
    }

    /**
     * List all staff
     */
    findAll(): Observable<Staff[]> {
        return this.http.get('/staff/all')
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * List clients by staff
     */
    listClientsByStaff(staff: Staff): Observable<Client[]> {
        return this.http.get(`/staff/clients/${staff.id}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        return res.json() || {};
    }

    private handleError(error: any) {
        return Observable.throw(error._body);
    }
}