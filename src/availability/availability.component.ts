import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import * as moment from 'moment';

import { Availability, DayOfWeek} from '../model/model';
import { CalendarComponent } from '../common/calendar/calendar.component';
import { Snapshot } from '../common/calendar/calendar.service';
import { ZeroPadPipe } from '../common/pipes/zero-pad.pipe';
import { AvailabilityService } from './availability.service';

/**
 * This is a many to one in that a Person can have many availabilities. Note that this is a snapshot in time
 * for a given date
 */
@Component({
    selector: 'em-availability',
    templateUrl: './availability.component.html',
    pipes: [ZeroPadPipe],
    directives: [CalendarComponent]
})
export class AvailabilityComponent implements OnInit {

    // custom gives us day selection with times.
    // if this is undefined, we get the calendar with times
    @Input() custom: boolean;
    @Output() availabilityChange = new EventEmitter<Availability[]>();

    /**
     * Calendar options
     */
    calendarActive: boolean = false;
    timeActive: boolean = false;
    date: string = '';
    daysOfWeek: DayOfWeek[];

    /**
     * Shared
     */
    availabilities: Availability[] = [];
    times: string[];
    startTime: string;
    finishTime: string;

    /**
     * Day (non-custom) options
     */
    selectedDay: DayOfWeek;
    selectedDaysAndTimes: string[] = [];

    constructor(private availabilityService: AvailabilityService) { }

    ngOnInit() {
        this.times = this.availabilityService.selectableTimesOfDay();
        this.daysOfWeek = [
            DayOfWeek.MONDAY,
            DayOfWeek.TUESDAY,
            DayOfWeek.WEDNESDAY,
            DayOfWeek.THURSDAY,
            DayOfWeek.FRIDAY,
            DayOfWeek.SATURDAY,
            DayOfWeek.SUNDAY
        ]
    }

    update() {
        if (this.availabilities.length > 0) {
            this.availabilityChange.emit(this.availabilities);
        }
    }

    updateAvailability(snapshot?: Snapshot) {
        if (snapshot) {
            this.calendarActive = false;
            this.date = snapshot.friendlyName;
            console.warn('FIXME!');
        }
    }

    updateTimeSelection(event: any) {
        this.timeActive = false;
    }

    activateCalendar() {
        this.calendarActive = true;
    }

    cancel() {
        this.availabilityService.cancel();
    }

    addSelectedDayAndTimes() {

        if (this.selectedDay && this.startTime && this.finishTime) {
            let availability = new Availability();
            availability.dayOfWeek = this.selectedDay;
            availability.fromTime = this.startTime;
            availability.toTime = this.finishTime;
            this.availabilities.push(availability);
        }

        this.selectedDay = undefined;
        this.startTime = undefined;
        this.finishTime = undefined;
    }
}