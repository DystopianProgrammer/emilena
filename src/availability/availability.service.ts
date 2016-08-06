import { Injectable } from '@angular/core';
import { Snapshot } from '../common/calendar/calendar.service';
import { Availability } from '../model/model';

export class Time {
    hours: number;
    minutes: number;
}

@Injectable()
export class AvailabilityService {

    transform(snapshot: Snapshot): Availability {

        let date = new Date();
        date.setFullYear(snapshot.year);
        date.setMonth(snapshot.month - 1);
        date.setDate(snapshot.date);

        let availability = new Availability();
        availability.date = date;

        return availability;
    }

    availabilityTimes(): Time[] {

        const MAX_HOURS = 23;
        const MAX_MINUTES = 59;

        let formattedSelectableTimes = new Array<Time>();

        for (let i = 0; i <= MAX_HOURS; i++) {
            for (let j = 0; j <= MAX_MINUTES; j += 5) {
                let time = new Time();
                time.hours = i;
                time.minutes = j;
                formattedSelectableTimes.push(time);
            }
        }

        return formattedSelectableTimes;
    }
}