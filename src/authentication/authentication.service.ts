import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../model/model';


export class AuthenticatedUser {
    _principle: string;
    _encryptedCredentials: string;
    _authenticationStatus: AuthenticationStatus;

    constructor(encryptedCredentials?: string, authenticationStatus?: AuthenticationStatus, principle?: string) {
        this._authenticationStatus = authenticationStatus;
        this._encryptedCredentials = encryptedCredentials;
        this._principle = principle;
    }

    get encryptedCredentials() {
        return this._encryptedCredentials;
    }

    get authenticationStatus() {
        return this._authenticationStatus;
    }

    get principle() {
        return this._principle;
    }

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

    private _authenticatedUser: AuthenticatedUser;
    private authenticatedUserSource = new BehaviorSubject(new AuthenticatedUser());

    constructor(private http: Http) { }

    authenticatedUserSource$ = this.authenticatedUserSource.asObservable();

    /**
     * Submit method for the login form. This requests authentication using the basic method.
     */
    authenticate(user: User): Observable<User> {
        this._authenticatedUser =
            new AuthenticatedUser(btoa(user.userName + ':' + user.password), AuthenticationStatus.LOGGED_IN, user.userName);
        let notifySubscribers = (response: Response): any => {
            this.authenticatedUserSource.next(this._authenticatedUser);
            return response.json;
        }

        let headers = this.secureHeader(this._authenticatedUser.encryptedCredentials);
        let options = new RequestOptions({ headers: headers });
        return this.http.get('/user/login', options)
            .map(notifySubscribers)
            .catch(error => Observable.throw(error._body));
    }

    /**
     * Notify all subscribers of any state change to the authenticated user
     */
    notify(authenticatedUser: AuthenticatedUser) {
        this._authenticatedUser = authenticatedUser;
        this.authenticatedUserSource.next(authenticatedUser);
    }

    /**
     * Gets the current authenticated user
     */
    get authenticatedUser(): AuthenticatedUser {
        return this._authenticatedUser;
    }

    /**
     * This is requred for any http request for authentication.
     */
    secureHeader(credentials: string): Headers {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + this._authenticatedUser.encryptedCredentials);
        return headers;
    }
}