import { CalendarService } from './calendar.service';

describe('The calendar service', () => {
    it('should create snapshots for specified year and month', () => {

        let calendarService = new CalendarService();
        let snapshots = calendarService.listSnapshots(2016, 9);

        expect(snapshots.length).toEqual(30);
        expect(snapshots[5].date).toEqual(6);
    });
});