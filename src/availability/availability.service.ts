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

    availabilityTimes(hours: number, minutes: number): Time[] {

        const MAX_HOURS = 23;
        const MAX_MINUTES = 59;

        let formattedSelectableTimes = new Array<Time>();

        let increment = (hour: number, minute: number) => {
            for (let h = hour; h <= MAX_HOURS; h++) {
                for (let m = minute; m <= MAX_MINUTES; m+=5) {
                    let time = new Time();
                    time.hours = h;
                    time.minutes = m;
                    formattedSelectableTimes.push(time);
                }
            }
        }

        minutes = 5 * Math.ceil(minutes/ 5);
        increment(hours, minutes);

        return formattedSelectableTimes;
    }
}