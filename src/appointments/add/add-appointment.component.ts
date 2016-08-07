import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Client, Staff, Address, Appointment } from '../../model/model';
import { AppointmentService } from '../appointment.service';
import { AddressComponent } from '../../address/address.component';
import { CollapsibleContentComponent } from '../../common/collapsible-content/collapsible-content.component';

@Component({
    selector: 'em-add-appointment',
    directives: [AddressComponent, CollapsibleContentComponent, ROUTER_DIRECTIVES],
    templateUrl: './add-appointment.component.html'
})
export class AddAppointmentComponent {

    activeClients: Client[] = [];
    activeStaff: Staff[] = [];
    address = new Address();
    appointment = new Appointment();
    active = true;

    constructor(private appointmentService: AppointmentService) {
        this.appointmentService.fetchActiveClients().subscribe(clients => this.activeClients = clients);
        this.appointmentService.fetchActiveStaff().subscribe(staff => this.activeStaff = staff);
    }

    create(appointment: Appointment): void {

    }

    cancel(): void {

    }
}