import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../authentication/authentication.service';
import { PersonService } from '../../person/person.service';

import { Staff, Client } from '../../model/model';

export class StaffService extends PersonService {

    /**
     * List all staff
     */
    findAll(): Observable<Staff[]> {
        return super.getHttp().get('/staff/all')
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }

    /**
     * List clients by staff
     */
    listClientsByStaff(staff: Staff): Observable<Client[]> {
        return super.getHttp().get(`/staff/clients/${staff.id}`)
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }

    /**
     * Find staff member by id
     */
    findById(id: number): Observable<Staff> {
        return super.getHttp().get(`/staff/${id}`)
            .map(res => res.json() || {})
            .catch(error => Observable.throw(error._body));
    }
}