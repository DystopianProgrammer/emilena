import { Injectable } from '@angular/core';

import * as moment from 'moment';


@Injectable()
export class CalendarService {

    /**
     * 7 columns
     *
     */
    getDaysForMonthAndYear(month: number, year: number): moment.MomentDateObject[] {

        let dates: moment.MomentDateObject[] = [];

        for(let i = 0; i < 35; i++) {
            dates.push(moment().add(i, 'd').toObject());
        }

        return dates;
    }
}