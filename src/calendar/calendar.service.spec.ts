import { CalendarService } from './calendar.service';

describe('the calendar service', () => {
    it('should give me the now date', () => {
        let calendarService = new CalendarService();
        calendarService.getDaysForMonthAndYear(1, 2016);
    })
})