import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { GeneralAvailability, Availability, DayOfWeek} from '../model/model';
import { CalendarComponent } from '../common/calendar/calendar.component';
import { Snapshot } from '../common/calendar/calendar.service';
import { ZeroPadPipe } from '../common/pipes/zero-pad.pipe';
import { AvailabilityService, Time } from './availability.service';

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
    providers: [AvailabilityService],
    pipes: [ZeroPadPipe],
    directives: [CalendarComponent]
})
export class AvailabilityComponent implements OnInit {

    @Input() availability: Availability;
    @Output() availabilityChange = new EventEmitter<Availability>();
    @Output() generalAvailabilityChange = new EventEmitter<GeneralAvailability>();

    calendarActive: boolean = false;

    date: string = '';
    dateFrom: string = '';
    dateTo: string = '';

    times: Time[];
    daysOfWeek: DayOfWeek[];

    custom: boolean = false;
    buttonLabel = 'Custom';
    checkBoxItems: CheckBoxItem[];
    disableCustom: boolean;

    // Reset the form with a new hero AND restore 'pristine' class state
    // by toggling 'active' flag which causes the form
    // to be removed/re-added in a tick via NgIf
    // TODO: Workaround until NgForm has a reset method (#6822)
    active: boolean = true;

    constructor(private availabilityService: AvailabilityService) { }

    ngOnInit() {
        let date = new Date();
        this.times = this.availabilityService.availabilityTimes();
        this.initCheckBoxItems();
    }

    update() {
        if (!this.disableCustom) {
            this.availabilityChange.emit(this.availability);
        } else {
            // transform the checkboxes to GeneralAvailability
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
            generalAvailability.daysOfWeek = daysOfWeek;
            this.generalAvailabilityChange.emit(generalAvailability);
        }
    }

    cancel() {
        this.active = false;
        // send back the unchanged availability
        this.update();
    }

    setDate(snapshot?: Snapshot) {
        if (snapshot && !this.disableCustom) {
            this.calendarActive = false;
            // update the display
            this.date = snapshot.friendlyName;
            // update the model
            this.availability = this.availabilityService.transform(snapshot);
        }
    }

    toggleFunction() {
        if (!this.disableCustom) {
            this.custom = !this.custom;
            this.buttonLabel = (this.buttonLabel === 'Custom') ? 'General' : 'Custom';
        }
    }

    activateCalendar() {
        this.calendarActive = true;
    }

    disableCounterModel() {
        // if general checkboxes (days) are selected, we have to disable the custom availability model input
        // the timeout is for an oddity with event timings
        setTimeout(() => {
            let hasDisabledItems = this.checkBoxItems.filter(item => item.selected === true);
            this.disableCustom = (hasDisabledItems.length > 0);
        }, 100);
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