import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { GeneralAvailability, Availability, DayOfWeek} from '../model/model';
import { CalendarComponent } from '../common/calendar/calendar.component';
import { Snapshot } from '../common/calendar/calendar.service';
import { ZeroPadPipe } from '../common/pipes/zero-pad.pipe';
import { AvailabilityService, Time } from './availability.service';
import { DayOfWeekSerializer } from '../common/serializers/day-of-week-serializer';

class CheckBoxItem {
    name: string;
    id: string;
    selected: boolean;
}

/**
 * This is a many to one in that a Person can have many availabilities. Note that this is a snapshot in time
 * for a given date - NOT A DURATION.
 */
@Component({
    selector: 'em-availability',
    templateUrl: './availability.component.html',
    pipes: [ZeroPadPipe],
    directives: [CalendarComponent]
})
export class AvailabilityComponent implements OnInit {

    // indicates whether we want to the general availability, or custom availability display
    @Input() custom: boolean;

    @Output() availabilityChange = new EventEmitter<Availability[]>();
    @Output() generalAvailabilityChange = new EventEmitter<GeneralAvailability>();

    calendarActive: boolean = false;

    // for the form display
    date: string = '';

    // These are only specific to availabilities - NOT general availability
    fromTime: Time;
    toTime: Time;

    times: Time[];
    daysOfWeek: DayOfWeek[];

    buttonLabel = 'Custom';
    checkBoxItems: CheckBoxItem[];

    availability: Availability;
    availabilities: Availability[] = [];

    // Reset the form with a new hero AND restore 'pristine' class state
    // by toggling 'active' flag which causes the form
    // to be removed/re-added in a tick via NgIf
    // TODO: Workaround until NgForm has a reset method (#6822)
    active: boolean = true;

    constructor(private availabilityService: AvailabilityService) { }

    ngOnInit() {
        this.times = this.availabilityService.availabilityTimes();
        this.initCheckBoxItems();

        if (this.custom) {
            this.availability = new Availability();
        }
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

                a.fromDate = tFrom;
                a.toDate = tTo;
            });
            this.availabilityChange.emit(this.availabilities);
        }

        let generalAvailability = this.updateGeneralAvailability();
        if (generalAvailability.daysOfWeek && generalAvailability.daysOfWeek.length > 0) {
            this.generalAvailabilityChange.emit(generalAvailability);
        }
    }

    cancel() {
        this.availabilityService.cancel();
    }

    updateAvailability(snapshot?: Snapshot) {
        if (snapshot) {
            this.calendarActive = false;
            this.date = snapshot.friendlyName;
            let availability = this.availabilityService.transform(snapshot);
            this.availabilities.push(availability);
        }
    }

    activateCalendar() {
        this.calendarActive = true;
    }


    private updateGeneralAvailability(): GeneralAvailability {
        let daysOfWeek = this.checkBoxItems
            .filter(item => item.selected === true)
            .map(item => {
                switch (item.id.toUpperCase()) {
                    case 'MONDAY': return DayOfWeek.MONDAY;
                    case 'TUESDAY': return DayOfWeek.TUESDAY;
                    case 'WEDNESDAY': return DayOfWeek.WEDNESDAY;
                    case 'THURSDAY': return DayOfWeek.THURSDAY;
                    case 'FRIDAY': return DayOfWeek.FRIDAY;
                    case 'SATURDAY': return DayOfWeek.SATURDAY;
                    default: return DayOfWeek.SUNDAY;
                }
            });

        let generalAvailability = new GeneralAvailability();
        generalAvailability.daysOfWeek = DayOfWeekSerializer.getInstance().fromCollection(daysOfWeek);
        return generalAvailability;
    }

    private initCheckBoxItems() {
        this.checkBoxItems = [
            this.builder('Sun', 'sunday', false),
            this.builder('Mon', 'monday', false),
            this.builder('Tues', 'tuesday', false),
            this.builder('Weds', 'wednesday', false),
            this.builder('Thurs', 'thursday', false),
            this.builder('Fri', 'friday', false),
            this.builder('Sat', 'saturday', false)
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