import { Pipe, PipeTransform } from '@angular/core';

import { Address } from '../../model/model';

@Pipe({ name: 'emAddress' })
export class AddressPipe implements PipeTransform {
    transform(value: Address): string {
        return `${value.town}, ${value.postCode}`;
    }
}