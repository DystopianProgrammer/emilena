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
    dayOfWeek: DayOfWeek;
    fromTime: string;
    toTime: string;
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

/**
 * Appointment
 */
export class Appointment {
    staff: Staff;
    client: Client;
    appointmentDate: Date;
    startTime: string;
    endTime: string;
    location: Address;
    notes: string;
    complete: boolean;
}

/**
 * DayOfWeek
 */
export enum DayOfWeek {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}

/**
 * Alerts
 */
export class Alerts {
    pendingAlerts: Appointment[];
    futureAlerts: Appointment[];
}

/**
 * Assignment
 */
export class Assignment {
    id: number;
    staff: Staff;
    client: Client;
    dayOfWeek: DayOfWeek;
    timeFrom: string;
    timeTo: string;
    hours: number;
}

/**
 * Rota
 */
export class Rota {
    id: number;
    weekCommencing: Date;
    monday: Assignment[];
    tuesday: Assignment[];
    wednesday: Assignment[];
    thursday: Assignment[];
    friday: Assignment[];
    saturday: Assignment[];
    sunday: Assignment[];
}