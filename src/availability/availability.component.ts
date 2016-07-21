import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Person, Staff, Client, Availability, DayOfWeek } from '../model/model';
import { CalendarComponent } from '../calendar/calendar.component';
import { EmCalendar } from '../calendar/calendar';

/**
 * This is a many to one in that a Person can have many availabilities. Note that this is a snapshot in time
 * for a given date - NOT A DURATION.
 */
@Component({
    selector: 'em-availability',
    templateUrl: './availability.component.html'
})
export class AvailabilityComponent {

    @Input() availability: any;
    @Output() availabilityChange = new EventEmitter<Availability>();

    update(availability: any) {
        this.availabilityChange.emit(availability);
    }
}