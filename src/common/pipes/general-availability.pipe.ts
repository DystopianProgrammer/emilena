import { Pipe, PipeTransform } from '@angular/core';
import { GeneralAvailability } from '../../model/model';

@Pipe({ name: 'generalAvailability' })
export class GeneralAvailabilityPipe implements PipeTransform {

    transform(value: GeneralAvailability): string[] {
        let shortName = (name: string) => {
            switch(name) {
                case 'MONDAY': return 'Mo';
                case 'TUESDAY': return 'Tu';
                case 'WEDNESDAY': return 'We';
                case 'THURSDAY': return 'Th';
                case 'FRIDAY': return 'Fr';
                case 'SATURDAY': return 'Sa';
                case 'SUNDAY': return 'Su';
                default: '';
            }
        }
        return (value) ? value.daysOfWeek.map(d => shortName(d)) : [];
    }
}