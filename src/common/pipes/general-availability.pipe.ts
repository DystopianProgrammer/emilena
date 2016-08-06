import { Pipe, PipeTransform } from '@angular/core';
import { GeneralAvailability } from '../../model/model';

@Pipe({ name: 'generalAvailability' })
export class GeneralAvailabilityPipe implements PipeTransform {
    transform(value: GeneralAvailability): string[] {
        return (value) ? value.daysOfWeek : [];
    }
}