import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Staff } from '../../model/model';
import { Session } from '../../session/session';

/**
 * Eliminates much of the boiler plate http requests
 */
@Injectable()
export class HttpMethods {

    constructor(private http: Http, private session: Session) { }

    httpGET(path: string): Observable<any> {
        let headers = this.session.secureJSONHeaders();
        let options = new RequestOptions({ headers: headers, body: '' });
        return this.http.get(path, options)
            .map(res => res.json())
            .catch(err => (Observable.throw(err._body)));
    }
}