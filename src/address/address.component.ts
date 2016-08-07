import { Component, Input } from '@angular/core';

import { Address } from '../model/model';

@Component({
    selector: 'em-address',
    templateUrl: './address.component.html'
})
export class AddressComponent {
    @Input() address: Address;
}