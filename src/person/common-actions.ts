import { Person, Staff, Client, Address, Availability } from '../model/model';

export abstract class CommonActions {

    _person: Person;

    constructor(person: Person) {
        this._person = person;
        this._person.address = new Address();
    }

    showAvailabilityForm: boolean = false;
    active = true;

    // Availability
    addAvailability() {
        this.showAvailabilityForm = true;
    }

    availabilityUpdated(availabilities: Availability[]) {
        this.showAvailabilityForm = false;
        this._person.availabilities = availabilities;
    }

    removeAvailability(index: number) {
        this._person.availabilities.splice(index, 1);
    }

    setPerson(person: Person) {
        this._person = person;
    }

    person(): Person {
        return this._person;
    }

    // this includes general availability as well as custom availability
    cancelAvailability(cancel: boolean) {
        this.showAvailabilityForm = false;
    }

    clear(): void {
        if (this._person instanceof Staff) {
            this._person = new Staff();
            this._person.address = new Address();
        } else if (this._person instanceof Client) {
            this._person = new Client();
            this._person.address = new Address();
        } else {
            console.error('common-actions: Unknown person type: ' + this._person);
        }
    }
}