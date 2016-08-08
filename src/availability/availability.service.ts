import { Injectable } from '@angular/core';

import { Snapshot } from '../common/calendar/calendar.service';
import { Availability } from '../model/model';

import { Subject } from 'rxjs/Subject';

export class Time {
    hours: number;
    minutes: number;
}

@Injectable()
export class AvailabilityService {

    private cancelAvailabilityForm = new Subject<boolean>();

    cancelAvailabilityForm$ = this.cancelAvailabilityForm.asObservable();

    cancel(): void {
        this.cancelAvailabilityForm.next(false);
    }

    transform(snapshot: Snapshot): Availability {

        let date = new Date();
        date.setFullYear(snapshot.year);
        date.setMonth(snapshot.month - 1);
        date.setDate(snapshot.date);

        let availability = new Availability();

        availability.date = date;
        availability.fromDate = date;
        availability.toDate = date;

        return availability;
    }

    availabilityTimes(): Time[] {

        const MAX_HOURS = 23;
        const MAX_MINUTES = 59;

        let formattedSelectableTimes = new Array<Time>();

        for (let i = 7; i <= MAX_HOURS; i++) {
            for (let j = 0; j <= MAX_MINUTES; j += 15) {
                let time = new Time();
                time.hours = i;
                time.minutes = j;
                formattedSelectableTimes.push(time);
            }
        }

        return formattedSelectableTimes;
    }
}