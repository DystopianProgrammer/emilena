import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Staff } from '../../model/model';
import { Session } from '../../session/session';

/**
 * Eliminates much of the boiler plate http requests
 */
@Injectable()
export class HttpMethods {

    constructor(private http: Http,
        private router: Router,
        private session: Session) { }

    /**
     * Performs a get
     */
    httpGET(path: string): Observable<any> {
        let headers = this.session.secureJSONHeaders();
        let options = new RequestOptions({ headers: headers, body: '' });
        return this.http.get(path, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * Performs a post
     */
    httpPost(entity: any, url: string): Observable<any> {
        let body = JSON.stringify(entity);
        let headers = this.session.secureJSONHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map(res => res.json() || {})
            .catch(this.handleError);
    }

    private handleError(error: any): any {
        // console.error(this.router);
        // this.router.navigate([`error/${error._body.code}`]);
        return Observable.throw(error._body);
    }
}