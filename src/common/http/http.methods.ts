import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Staff } from '../../model/model';
import { Session } from '../../session/session';
import { LoaderService } from '../../common/loader/loader.service';

/**
 * Eliminates much of the boiler plate http requests
 */
@Injectable()
export class HttpMethods {

    constructor(private http: Http,
        private loaderService: LoaderService,
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
            .catch(err => this.handleError(err));
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
            .catch(err => this.handleError(err));
    }

    private handleError(error: any): any {
        this.router.navigate(['/error']);
        this.loaderService.notifyIsLoaded(true);
        return Observable.throw(error._body);
    }
}