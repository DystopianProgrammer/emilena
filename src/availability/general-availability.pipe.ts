import { Pipe, PipeTransform } from '@angular/core';
import { GeneralAvailability, DayOfWeek } from '../model/model';

@Pipe({ name: 'generalAvailabilityPipe' })
export class GeneralAvailabilityPipe implements PipeTransform {
    transform(value: GeneralAvailability): string {
        return value.daysOfWeek.map(dow => DayOfWeek[dow].toLocaleLowerCase()).join(', ');
    }
}