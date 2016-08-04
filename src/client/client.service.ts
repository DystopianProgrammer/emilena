import { Observable } from 'rxjs/Observable';
import { PersonService } from '../person/person.service';

import { Client } from '../model/model';

export class ClientService extends PersonService {

    findAll(): Observable<Client[]> {
        return super.getHttp().get('/client/all')
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }
}