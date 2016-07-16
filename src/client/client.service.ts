import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Client } from '../model/model';

@Injectable()
export class ClientService {

    constructor(private http: Http) { }

    addClient(client: Client): Observable<Client> {
        let body = JSON.stringify(client);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('/client/add', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteClient(client: Client) {
        return this.http.delete(`/client/delete/${client.id}`).catch(this.handleError);
    }

    updateClient(client: Client) {
    }

    findAll(): Observable<Client[]> {
        return this.http.get('/client/all')
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        return res.json() || {};
    }

    private handleError(error: any) {
        return Observable.throw(error._body);
    }
}