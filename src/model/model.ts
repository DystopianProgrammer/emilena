
/**
 * Person
 */
export class Person {
    id: number;
    forename: string;
    surname: string;
    email: string;
    telephoneNumber: number;
    address: Address;
    dob: Date;
    availability: Availability[];
    preferences: string;
}

/**
 * Staff
 */
export class Staff extends Person {
    contractType: string;
    staffType: string;
    contractedHours: number;
}

/**
 * Client
 */
export class Client extends Person {
    staff: Staff[];
}

/**
 * Address
 */
export class Address {
    houseNumber: string;
    firstLine: string;
    secondLine: string;
    town: string;
    postCode: string;
    friendlyAddress: string;
}

/**
 * Availability is from Monday to Sunday from 8am till 10pm
 * This should be configurable
 *
 * This is a many to one in that a Person can have many availabilities. Note that this is a snapshot in time
 * for a given date - NOT A DURATION.
 */
export class Availability {
    dateAndTime: Date;
    dayOfWeek: string;
    numberOfHours: number;
    person: Person;
}

/**
 * Absence
 */
export class Absence {
    absenceType: string;
    date: Date;
    reason: string;
    person: Person;
}

export enum DayOfWeek {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}