import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * formats serialized java.time.LocalTime from HH,MM to HH:MM
 */
@Pipe({ name: 'localTime' })
export class LocalTime implements PipeTransform {
    transform(value: any[]): string {
        return moment().hour(value[0]).minute(value[1]).format('HH:MM');
    }
}