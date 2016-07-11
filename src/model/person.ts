import { Address } from './address'

export abstract class Person {
    forename: string;
    surname: string;
    email: string;
    telephone: number;
    address: Address;
}