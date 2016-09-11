import { Injectable } from '@angular/core';

import { Snapshot } from '../common/calendar/calendar.service';
import { Availability, DayOfWeek } from '../model/model';

import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class AvailabilityService {

    private cancelAvailabilityForm = new Subject<boolean>();

    cancelAvailabilityForm$ = this.cancelAvailabilityForm.asObservable();

    cancel(): void {
        this.cancelAvailabilityForm.next(false);
    }

    selectableTimesOfDay(): string[] {
        let times: string[] = [];
        for(let i = 0; i <= 24; i++) {
            for(let j = 0; j <= 59; j+=30) {
                let time = moment().hour(i).minute(j).format('HH:mm');
                times.push(time);
            }
        }
        return times;
    }
}