import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Client } from '../../model/model';

@Injectable()
export class ClientService {

    constructor(private http: Http, private authenticationService: AuthenticationService) { }

    /**
     * Find all clients (both active and inactive)
     */
    findAll(): Observable<Client[]> {
        return this.http.get('/client/all')
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }

    /**
     * Find client by id
     */
    findById(id: number): Observable<Client> {
        return this.http.get(`/client/${id}`)
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }

    /**
     * Creates a new client
     */
    add(person: Client): Observable<Client> {
        return this.operation(person, 'client/add');
    }

    /**
     * Updates an existing client
     */
    update(person: Client) {
        return this.operation(person, '/client/update');
    }

    private operation(person: Client, url: string): Observable<Client> {
        let body = JSON.stringify(person);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }
}
