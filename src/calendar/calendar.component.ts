import  { Component } from '@angular/core';
import { EmCalendar } from './calendar';

@Component({
    selector: 'em-calendar',
    templateUrl: './calendar.component.html'
})
export class CalendarComponent {

    months: EmCalendar.EmMonths[] =
        Object.keys(EmCalendar.EmMonths).map(key => EmCalendar.EmDaysForYear[key]);
}