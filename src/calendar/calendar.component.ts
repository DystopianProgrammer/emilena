import { Component, Input, Output, OnInit } from '@angular/core';

import * as moment from 'moment';

import { PaddedDatePipe } from './calendar.pipe';

enum MonthsEnum {
    January, February, March, April, May, June, July, August, September, October, November, December
}

const MAX_YEARS: number = 5;

@Component({
    selector: 'em-calendar',
    templateUrl: './calendar.component.html',
    pipes: [PaddedDatePipe]
})
export class CalendarComponent implements OnInit {

    dates: moment.MomentDateObject[] = [];
    selectYear: number[] = [];
    currentMonths: string;

    // the chunking - 5 rows to cater for the max number of days in a month
    row1: moment.MomentDateObject[];
    row2: moment.MomentDateObject[];
    row3: moment.MomentDateObject[];
    row4: moment.MomentDateObject[];
    row5: moment.MomentDateObject[];

    ngOnInit() {
        let momentDateObject = moment().toObject();
        this.initCalendar(momentDateObject.date, momentDateObject.months, momentDateObject.years);
    }

    selectMonth() {
    }

    private initCalendar(date: number, month: number, year: number) {

        let selectableYear = year;
        for(let i = year; i < year + MAX_YEARS; i++) {
            this.selectYear.push(selectableYear);
            selectableYear++;
        }

        let dates: moment.MomentDateObject[] = [];

        for (let i = 0; i < 35; i++) {
            let momentDateObject =
                moment(`${month}-${date}-${year}`, 'MM-DD-YYYY').add(i, 'd').toObject();
            this.dates.push(momentDateObject);
        }

        // then we need to chunk it in rows of 7
        this.row1 = this.dates.slice(0, 7);
        this.row2 = this.dates.slice(7, 14);
        this.row3 = this.dates.slice(14, 21);
        this.row4 = this.dates.slice(21, 28);
        this.row5 = this.dates.slice(28, this.dates.length);

        let filler = 7 - this.row5.length;
        for (let i = 0; i < filler; i++) {
            this.row5.splice(this.row5.length, 0, 0);
        }

        this.displayCurrentMonths();
    }

    private displayCurrentMonths(): void {
        let container = new Array<number>();
        this.dates.forEach(date => container.push(date.months));

        let dateString = '';

        this.currentMonths =
            container.filter((item, pos) => container.indexOf(item)== pos)
                .map(date => dateString = MonthsEnum[date + 1])
                .join('/');
    }
}