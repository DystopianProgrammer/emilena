import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../authentication/authentication.service';

import { Client } from '../../model/model';
import { Session } from '../../session/session';
import { HttpMethods } from '../../common/http/http.methods';

@Injectable()
export class ClientService {

    constructor(private httpMethods: HttpMethods, private session: Session) { }

    /**
     * Find all clients (both active and inactive)
     */
    findAll(): Observable<Client[]> {
        return this.httpMethods.httpGET('/client/all');
    }

    /**
     * Find client by id
     */
    findById(id: number): Observable<Client> {
        return this.httpMethods.httpGET(`/client/${id}`);
    }

    /**
     * Creates a new client
     */
    add(person: Client): Observable<Client> {
        return this.httpMethods.httpPost(person, 'client/add');
    }

    /**
     * Updates an existing client
     */
    update(person: Client) {
        return this.httpMethods.httpPost(person, '/client/update');
    }
}
