import { Person, Staff, Address, Availability, GeneralAvailability } from '../model/model';

export abstract class CommonActions {

    private _person: Person;

    constructor(person: Person) {
        this._person = person;
        this._person.address = new Address();
        this._person.availabilities = [];
    }

    availabilities: Availability[];
    showAvailabilityForm: boolean = false;
    active = true;

    addAvailability() {
        this.showAvailabilityForm = true;
    }

    availabilityUpdated(availability: Availability) {
        if (availability.date) {
            this._person.availabilities.push(availability);
        }
        this.showAvailabilityForm = false;
    }

    generalAvailabilityUpdated(generalAvailability: GeneralAvailability) {
        this.showAvailabilityForm = false;
        this._person.generalAvailability = generalAvailability;
    }

    removeAvailability(index: number) {
        this._person.availabilities.splice(index, 1);
    }

    removeGeneralAvailability() {
        this._person.generalAvailability = undefined;
    }

    person(): Person {
        return this._person;
    }
}