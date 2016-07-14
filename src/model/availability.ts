import { Person } from './person';

/**
 * Availability is from Monday to Sunday from 8am till 10pm
 * This should be configurable
 */
export class Availability {
    dateAndTime: Date;
    persons: Person[];
}