import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Availability } from '../model/model';
import { CalendarComponent } from '../common/calendar/calendar.component';
import { Snapshot } from '../common/calendar/calendar.service';
import { AvailabilityService } from './availability.service';
/**
 * This is a many to one in that a Person can have many availabilities. Note that this is a snapshot in time
 * for a given date - NOT A DURATION.
 */
@Component({
    selector: 'em-availability',
    templateUrl: './availability.component.html',
    providers: [AvailabilityService],
    directives: [CalendarComponent]
})
export class AvailabilityComponent implements OnInit {

    @Input() availability: Availability;
    @Output() availabilityChange = new EventEmitter<Availability>();
    calendarActive: boolean = false;

    date: string = '';
    dateFrom: string = '';
    dateTo: string = '';

    timesFrom: string[];
    timesTo: string[];

    // Reset the form with a new hero AND restore 'pristine' class state
    // by toggling 'active' flag which causes the form
    // to be removed/re-added in a tick via NgIf
    // TODO: Workaround until NgForm has a reset method (#6822)
    active: boolean = true;

    constructor(private availabilityService: AvailabilityService) { }

    ngOnInit() {
        let date = new Date();
        let times = this.availabilityService.availabilityTimes(date.getHours(), date.getMinutes());
        this.timesFrom = times.map(time => `${time.hours} : ${time.minutes}`);
        this.timesTo = this.timesFrom;
    }

    update() {
        this.availabilityChange.emit(this.availability);
    }

    cancel() {
        this.active = false;
        // send back the unchanged availability
        this.update();
    }

    setDate(snapshot: Snapshot) {
        console.log(snapshot);
        this.calendarActive = false;

        // update the display
        this.date = snapshot.friendlyName;

        // update the model
        this.availability = this.availabilityService.transform(snapshot);
    }

    activateCalendar() {
        this.calendarActive = true;
    }
}