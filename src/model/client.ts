import { Person } from './person';

export class Client extends Person {

    fixedHoursPerWeek: number;
    preferencesOfTime: Date[];
    // if clients call with over 24 hours advance notice
    // the hours can be used elsewhere within the current month
    adhocHoursWithinCurrentMonth: number;
}