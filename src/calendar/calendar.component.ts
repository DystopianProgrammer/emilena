import { Component, Input, Output, OnInit } from '@angular/core';

import { EmCalendar, EmMonths, EmDays, EmDaysForYear } from '../calendar/calendar';

@Component({
    selector: 'em-calendar',
    templateUrl: './calendar.component.html',
    providers: [EmCalendar]
})
export class CalendarComponent implements OnInit {

    constructor(private emCalendar: EmCalendar) { }

    months: string[];
    days: number[];
    selectedMonth: any = {};

    // the chunking - 5 rows to cater for the max number of days in a month
    row1: number[];
    row2: number[];
    row3: number[];
    row4: number[];
    row5: number[];

    ngOnInit() {
        this.months =
            Object.keys(EmMonths).map(key => EmMonths[key]).filter(key => typeof key !== 'number');
        this.initCalendar(1)
    }

    selectMonth() {
        let month = EmMonths[this.selectedMonth];
        this.initCalendar(month)
    }

    private initCalendar(monthIndex: any) {

        let monthsAndDays = new EmCalendar().accumulateDaysForYear(new Date().getFullYear()).monthsWithDays;
        this.days = monthsAndDays[monthIndex];

        // then we need to chunk it in rows of 7
        this.row1 = this.days.slice(0, 7);
        this.row2 = this.days.slice(7, 14);
        this.row3 = this.days.slice(14, 21);
        this.row4 = this.days.slice(21, 28);
        this.row5 = this.days.slice(28, this.days.length);

        let filler = 7 - this.row5.length;
        for (let i = 0; i < filler; i++) {
            this.row5.splice(this.row5.length, 0, 0);
        }
    }
}