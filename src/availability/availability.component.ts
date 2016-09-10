import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Availability, DayOfWeek} from '../model/model';
import { CalendarComponent } from '../common/calendar/calendar.component';
import { TimeComponent } from '../common/time/time.component';
import { Snapshot } from '../common/calendar/calendar.service';
import { ZeroPadPipe } from '../common/pipes/zero-pad.pipe';
import { AvailabilityService, Time } from './availability.service';

const MONDAY: string = 'Mon';
const TUESDAY: string = 'Tues';
const WEDNESDAY: string = 'Weds';
const THURSDAY: string = 'Thurs';
const FRIDAY: string = 'Fri';
const SATURDAY: string = 'Sat';
const SUNDAY: string = 'Sun';

class CheckBoxItem {
    name: string;
    id: string;
    selected: boolean;

    dayOfWeekByName(): DayOfWeek {
        if (this.name) {
            switch (this.name) {
                case MONDAY: return DayOfWeek.MONDAY;
                case TUESDAY: return DayOfWeek.TUESDAY;
                case WEDNESDAY: return DayOfWeek.WEDNESDAY;
                case THURSDAY: return DayOfWeek.THURSDAY;
                case FRIDAY: return DayOfWeek.FRIDAY;
                case SATURDAY: return DayOfWeek.SATURDAY;
                case SUNDAY: return DayOfWeek.SUNDAY;
            }
        }
        return undefined;
    }
}

/**
 * This is a many to one in that a Person can have many availabilities. Note that this is a snapshot in time
 * for a given date
 */
@Component({
    selector: 'em-availability',
    templateUrl: './availability.component.html',
    pipes: [ZeroPadPipe],
    directives: [CalendarComponent, TimeComponent]
})
export class AvailabilityComponent implements OnInit {

    // indicates whether we want to the general availability, or custom availability display
    @Input() custom: boolean;
    @Output() availabilityChange = new EventEmitter<Availability[]>();

    calendarActive: boolean = false;
    timeActive: boolean = false;
    date: string = '';
    fromTime: Time;
    toTime: Time;
    times: Time[];
    daysOfWeek: DayOfWeek[];
    buttonLabel = 'Custom';
    checkBoxItems: CheckBoxItem[];
    availability: Availability;
    availabilities: Availability[] = [];
    active: boolean = true;
    checkBoxItem: CheckBoxItem = new CheckBoxItem();
    selectedDay: DayOfWeek;

    constructor(private availabilityService: AvailabilityService) { }

    ngOnInit() {
        this.times = this.availabilityService.availabilityTimes();
        this.initCheckBoxItems();
    }

    update() {
        if (this.availabilities.length > 0) {
            this.availabilities.map(a => {
                let tFrom = new Date(a.date.toDateString());
                tFrom.setHours(this.fromTime.hours);
                tFrom.setMinutes(this.fromTime.minutes);

                let tTo = new Date(a.date.toDateString());
                tTo.setHours(this.toTime.hours);
                tTo.setMinutes(this.toTime.minutes);

                a.fromTime = tFrom;
                a.toTime = tTo;
            });
            this.availabilityChange.emit(this.availabilities);
        }
    }

    updateAvailability(snapshot?: Snapshot) {
        if (snapshot) {
            this.calendarActive = false;
            this.date = snapshot.friendlyName;
            let availability = this.availabilityService.transform(snapshot);
            this.availabilities.push(availability);
        }
    }

    updateTimeSelection(event: any) {
        this.timeActive = false;
    }

    activateCalendar() {
        this.calendarActive = true;
    }

    selectDay(selection: CheckBoxItem) {
        if (!selection.selected) {
            this.selectedDay = selection.dayOfWeekByName();
            this.timeActive = true;
        }
    }

    cancel() {
        this.availabilityService.cancel();
    }

    private initCheckBoxItems() {
        this.checkBoxItems = [
            this.builder(SUNDAY, 'sunday', false),
            this.builder(MONDAY, 'monday', false),
            this.builder(TUESDAY, 'tuesday', false),
            this.builder(WEDNESDAY, 'wednesday', false),
            this.builder(THURSDAY, 'thursday', false),
            this.builder(FRIDAY, 'friday', false),
            this.builder(SATURDAY, 'saturday', false)
        ];
    }

    private builder(name: string, id: string, selected: boolean): CheckBoxItem {
        let checkBoxItem = new CheckBoxItem();
        checkBoxItem.name = name;
        checkBoxItem.id = id;
        checkBoxItem.selected = selected;
        return checkBoxItem;
    }
}