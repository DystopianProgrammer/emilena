import { Person } from './person';
import { Contractable } from './contractable';
import { Availability } from './availability';

export abstract class Staff extends Person implements Contractable {
    contractedHoursPerWeek: number;
    availability: Availability;

    abstract isContractable(): boolean;
}

export class Senior extends Staff {
    // days and time
    officeHoursPerWeek: Date[];

    isContractable(): boolean {
        return true;
    }
}

export class SupportWorker extends Staff {
    isContractor: boolean;

    isContractable(): boolean {
        return this.isContractor;
    }
}