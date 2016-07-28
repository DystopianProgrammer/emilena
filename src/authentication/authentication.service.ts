import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/model';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) { }

    submit(user: User): Observable<boolean> {
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('/user/login', body, options)
            .map(res => res.json || false)
            .catch(error => Observable.throw(error._body));
    }
}