import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Staff } from '../model/person';

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

    deleteStaff(id: number) {
    }

    updateStaff(staff: Staff) {
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}