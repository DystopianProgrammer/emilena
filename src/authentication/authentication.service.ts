import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/model';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) { }

    submit(user: User): Observable<boolean> {
        let body = JSON.stringify(user);
        let headers = new Headers();
        let credentials = btoa(user.userName + ':' + user.password);
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + credentials);
        let options = new RequestOptions({ headers: headers });

        return this.http.post('/user/login', user, options)
            .map(res => res.json || false)
            .catch(error => Observable.throw(error._body));
    }
}