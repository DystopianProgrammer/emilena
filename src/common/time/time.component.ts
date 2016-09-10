import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ZeroPadPipe } from '../pipes/zero-pad.pipe';

import { AvailabilityService, Time } from '../../availability/availability.service';
import { DayOfWeek } from '../../model/model';

export class Duration {
    from: Time;
    to: Time;
    day: DayOfWeek;
}

@Component({
    selector: 'em-time',
    templateUrl: './time.component.html',
    pipes: [ZeroPadPipe],
})
export class TimeComponent implements OnInit {

    @Output() timeSelection = new EventEmitter<Duration>();
    @Input() selectedDay: any;

    duration: Duration = new Duration();
    timesFrom: Time[] = [];
    timesTo: Time[] = [];

    constructor(private availabilityService: AvailabilityService) { }

    selectTime() {
        this.duration.day = this.selectedDay;
        this.timeSelection.emit(this.duration);
    }

    ngOnInit() {
        let times = this.availabilityService.availabilityTimes();
        this.timesFrom = this.timesFrom.concat(times);
        this.timesTo = this.timesTo.concat(times);
    }
}