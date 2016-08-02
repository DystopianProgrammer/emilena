import { AvailabilityService } from './availability.service';

describe('The availability service', () => {
    it('should create the correct number of availability times 1', () => {
        let service = new AvailabilityService();
        let times = service.availabilityTimes();
        expect(times.length).toBe(288);
    });
});