
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
}

/**
 * Staff
 */
export class Staff extends Person {
    contractType: string;
    staffType: string;
    availability: Availability;
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
    persons: Person[];
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