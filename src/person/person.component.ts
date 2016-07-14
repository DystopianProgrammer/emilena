import { Component, Input } from '@angular/core';

import { Person } from '../model/person';

@Component({
    selector: 'em-person',
    templateUrl: './person.component.html'
})
export class PersonComponent {

    @Input() person: Person;
}
