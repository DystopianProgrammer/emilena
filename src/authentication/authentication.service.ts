import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../model/model';


export class AuthenticatedUser {
    user: User;
    authenticationStatus: AuthenticationStatus;
}

export enum AuthenticationStatus {
    LOGGED_IN, LOGGED_OUT
}


/**
 * Authentication is handled server-side, meaning that the authorisation neither relies on oauth or cookies, as each request
 * has the headers with the authenticated user injected. We need to allow the angular app to be aware of this, and lock down
 * features that are role based.
 */
@Injectable()
export class AuthenticationService {

    constructor(private http: Http) { }

    private authenticatedUserSource = new BehaviorSubject(new AuthenticatedUser());

    authenticatedUserSource$ = this.authenticatedUserSource.asObservable();

    /**
     * Submit method for the login form. This requests authentication using the basic method.
     */
    authenticate(user: User): Observable<User> {
        let notifySubscribers = (response: Response): any => {
            let authenticatedUser = new AuthenticatedUser();
            authenticatedUser.user = user;
            authenticatedUser.authenticationStatus = AuthenticationStatus.LOGGED_IN;
            this.authenticatedUserSource.next(authenticatedUser);
            return response.json;
        }

        let headers = this.secureHeader(user);
        let options = new RequestOptions({ headers: headers });
        return this.http.get('/user/login', options)
            .map(notifySubscribers)
            .catch(error => Observable.throw(error._body));
    }

    notify(authenticatedUser: AuthenticatedUser) {
        this.authenticatedUserSource.next(authenticatedUser);
    }

    /**
     * This is requred for any http request for authentication.
     */
    secureHeader(user: User): Headers {
        let headers = new Headers();
        let credentials = btoa(user.userName + ':' + user.password);
        headers.append('Authorization', 'Basic ' + credentials);
        return headers;
    }
}