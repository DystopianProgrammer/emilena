import { Component } from '@angular/core';
import { Staff, Senior, SupportWorker } from '../model/staff';
import { Address } from '../model/address';
import { StaffService } from './staff.service';
import { PersonComponent } from '../person/person.component';

@Component({
    selector: 'em-staff',
    templateUrl: './staff.component.html',
    directives: [PersonComponent],
    providers: [StaffService]
})
export class StaffComponent {

    isSenior: boolean;
    forename: string;
    surname: string;
    email: string;
    address: Address;
    contractedHoursPerWeek: number;
    isContractor: boolean;

    constructor(private staffService: StaffService) {}

    addStaff(): void {
        let staff: any;
        if (this.isSenior) {
            staff = new Senior();
            this.updateStaffMember(staff);

        } else {
            staff = new SupportWorker();
            this.updateStaffMember(staff);
            staff.isContractor = this.isContractor;
        }
        this.staffService.addStaff(staff);
    }

    private updateStaffMember(staff: Staff) {
        staff.forename = this.forename;
        staff.surname = this.surname;
        staff.email = this.email;
        staff.address = this.address;
        staff.contractedHoursPerWeek = this.contractedHoursPerWeek;
    }

    editStaff(staff: Staff): any {
        this.updateStaffMember(staff);
        return staff;
    }

    removeStaff(staff: Staff): void {
    }
}