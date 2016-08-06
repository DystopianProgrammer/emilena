import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication/authentication.service';

import { Person, Staff } from '../model/model';

@Injectable()
export abstract class PersonService {

    private _http: Http;
    private _authenticationService: AuthenticationService;

    constructor(private http: Http, private authenticationService: AuthenticationService) {
        this._http = http;
        this._authenticationService = authenticationService;
    }

    add(person: Person): Observable<Person> {
        let body = JSON.stringify(person);

        let user = this.authenticationService.authenticatedUser;
        let headers = this.authenticationService.secureHeader(user.encryptedCredentials);
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({ headers: headers });

        let url = (person instanceof Staff) ? '/staff/add' : '/client/add';

        return this.http.post(url, body, options)
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }

    protected getHttp(): Http {
        return this._http;
    }
}