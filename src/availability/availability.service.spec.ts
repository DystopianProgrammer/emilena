import { AvailabilityService } from './availability.service';

describe('The availability service', () => {
    it('should create the correct number of availability times', () => {
        let service = new AvailabilityService();

        let times = service.availabilityTimes(16, 30);

        console.log(times);
    });
});