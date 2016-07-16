import { Component, Input } from '@angular/core';

import { Person } from '../model/model';

@Component({
    selector: 'em-address',
    templateUrl: './address.component.html'
})
export class AddressComponent {
    @Input() person: Person;
}