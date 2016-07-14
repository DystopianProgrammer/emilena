import { Address } from './address'

export abstract class Person {
    id: number;
    forename: string;
    surname: string;
    email: string;
    telephoneNumber: number;
    address: Address;
    dob: Date;
}

export class Staff extends Person {
    contractType: string;
    staffType: string;
    clients: Client[];
}

export class Client extends Person {
}