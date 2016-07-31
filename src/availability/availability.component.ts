import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment';

import { Availability } from '../model/model';
import { CalendarComponent } from '../common/calendar/calendar.component';

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

    // Reset the form with a new hero AND restore 'pristine' class state
    // by toggling 'active' flag which causes the form
    // to be removed/re-added in a tick via NgIf
    // TODO: Workaround until NgForm has a reset method (#6822)
    active: boolean = true;

    update() {
        this.availabilityChange.emit(this.availability);
    }

    cancel() {
        this.active = false;
        // send back the unchanged availability
        this.update();
    }

    setDate(date: moment.MomentDateObject) {
        this.calendarActive = false;
        let day = (date.date < 10) ? `0${date.date}` : `${date.date}`;
        let month = (date.months < 10) ? `0${date.months}` : `${date.months}`;
        this.availability.dateAndTime = `${date.years}-${month}-${day}`;
    }

    activateCalendar() {
        this.calendarActive = true;
    }
}