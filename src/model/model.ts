/**
 * systemUser of the system
 */
export class SystemUser {
    id: number;
    userName: string;
    password: string;
    staff: Staff;
    roleTypes: string[];
}


/**
 * Person - abstract class for client and staff
 */
export class Person {
    id: number;
    forename: string;
    surname: string;
    dob: Date;
    email: string;
    telephoneNumber: string;
    address: Address;
    availabilities: Availability[];
    absences: Absence[];
    preferences: string;
    appointments: Appointment[];
    active: boolean;
}

/**
 * Staff
 */
export class Staff extends Person {
    contractType: string;
    staffType: string;
    contractedHours: number;
    systemUser: SystemUser;
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
}

/**
 * Availability is from Monday to Sunday from 8am till 10pm
 * This should be configurable
 *
 */
export class Availability {
    date: Date;
    fromDate: Date;
    toDate: Date;
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

export class Appointment {
    staff: Staff;
    client: Client;
    fromDate: Date;
    toDate: Date;
    location: Address;
    notes: string;
    isComplete: boolean;
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

export class Alerts {
    pendingAlerts: Appointment[];
    futureAlerts: Appointment[];
}