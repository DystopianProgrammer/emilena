import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

// Temporary until a better solution comes along - see
// https://github.com/angular/angular/issues/10809
@Pipe({ name: 'emDate' })
export class DatePipe implements PipeTransform {
    transform(value: number): string {
        if(value) {
            let date = new Date(value);
            return moment(date).format('DD MMMM YYYY');
        } else {
            return '';
        }
    }
}