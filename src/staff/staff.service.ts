import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Staff, Client } from '../model/model';

@Injectable()
export class StaffService {

    constructor(private http: Http) { }

    addStaff(staff: Staff): Observable<Staff> {
        let body = JSON.stringify(staff);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('/staff/add', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteStaff(staff: Staff) {
        return this.http.delete(`/staff/delete/${staff.id}`).catch(this.handleError);
    }

    updateStaff(staff: Staff) {
    }

    findAll(): Observable<Staff[]> {
        return this.http.get('/staff/all')
            .map(this.extractData)
            .catch(this.handleError);
    }

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