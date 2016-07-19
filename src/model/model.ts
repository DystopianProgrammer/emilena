
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
 */
export class Availability {
    dateAndTime: Date;
    dayOfWeek: string;
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