import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment';

import { Person, Staff, Client, Availability, DayOfWeek } from '../model/model';
import { CalendarComponent } from '../calendar/calendar.component';

/**
 * This is a many to one in that a Person can have many availabilities. Note that this is a snapshot in time
 * for a given date - NOT A DURATION.
 */
@Component({
    selector: 'em-availability',
    templateUrl: './availability.component.html',
    directives: [CalendarComponent]
})
export class AvailabilityComponent {

    @Input() availability: any;
    @Output() availabilityChange = new EventEmitter<Availability>();
    calendarActive: boolean = false;

    date: string = '';

    update(availability: any) {
        this.availabilityChange.emit(availability);
    }

    setDate(date: moment.MomentDateObject) {
        this.calendarActive = false;
        let day = (date.date < 10) ? `0${date.date}` : `${date.date}`;
        let month = (date.months < 10) ? `0${date.months}` : `${date.months}`;
        this.date = `${day}/${month}/${date.years}`;
    }

    activateCalendar() {
        this.calendarActive = true;
    }
}