import { Component, Input } from '@angular/core';

import { Person } from '../model/person';

@Component({
    selector: 'em-address',
    templateUrl: './address.component.html'
})
export class AddressComponent {
    @Input() person: Person;
}