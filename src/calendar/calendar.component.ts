import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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
    currentMonthIndex: number;

    @Output() dateSelection = new EventEmitter<moment.MomentDateObject>();

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

    getPreviousMonth() {
        this.currentMonthIndex = this.currentMonthIndex - 1;
        let momentDateObject = moment().toObject();
        this.initCalendar(momentDateObject.date, this.currentMonthIndex, momentDateObject.years);
    }

    nextMonth() {
        this.currentMonthIndex = this.currentMonthIndex + 1;
        let momentDateObject = moment().toObject();
        this.initCalendar(momentDateObject.date, this.currentMonthIndex, momentDateObject.years);
    }

    selectDate(selectedDate: any) {
        this.dateSelection.emit(selectedDate);
    }

    private initCalendar(date: number, month: number, year: number) {

        this.currentMonthIndex = month;
        let selectableYear = year;
        for (let i = year; i < year + MAX_YEARS; i++) {
            this.selectYear.push(selectableYear);
            selectableYear++;
        }

        let localDates: moment.MomentDateObject[] = [];

        for (let i = 0; i < 35; i++) {
            let momentDateObject =
                moment(`${month}-${date}-${year}`, 'MM-DD-YYYY').add(i, 'd').toObject();
            localDates.push(momentDateObject);
        }

        // then we need to chunk it in rows of 7
        this.row1 = localDates.slice(0, 7);
        this.row2 = localDates.slice(7, 14);
        this.row3 = localDates.slice(14, 21);
        this.row4 = localDates.slice(21, 28);
        this.row5 = localDates.slice(28, localDates.length);

        this.dates = localDates;

        this.displayCurrentMonths();
    }

    private displayCurrentMonths(): void {
        let container = new Array<number>();
        this.dates.forEach(date => container.push(date.months));

        let dateString = '';

        this.currentMonths =
            container.filter((item, pos) => container.indexOf(item) == pos)
                .map(date => dateString = MonthsEnum[date + 1])
                .join('/');
    }
}