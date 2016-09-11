import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * formats serialized java.time.LocalTime from HH,MM to HH:MM
 */
@Pipe({ name: 'availabilityTime' })
export class AvailabilityTimePipe implements PipeTransform {

    transform(value: Date): string {
        let formatted = moment(value).format('HH:mm');
        return formatted;
    }
}