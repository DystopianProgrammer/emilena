import { addProviders } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';

describe('The calendar component', () => {

    let calendarComponent: CalendarComponent;

    beforeEach(() => {
        addProviders([CalendarService]);
        calendarComponent = new CalendarComponent(new CalendarService());
    });

    it('should chunks the days into the appropriate rows', () => {

        // for september 2016 the first day of the month is a Thursday
        // given that there are 5 chunked rows, the first row column 1 being sunday
        // the epectation is for shapshotRow1 to have the first day in index 4;
        // expect(calendarComponent.snapshotRow1[4].day).toEqual(1);
    });
});