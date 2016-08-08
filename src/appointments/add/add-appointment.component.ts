import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Client, Staff, Address, Appointment, Availability } from '../../model/model';
import { AppointmentService } from '../appointment.service';
import { AddressComponent } from '../../address/address.component';
import { CollapsibleContentComponent } from '../../common/collapsible-content/collapsible-content.component';
import { AvailabilityService } from '../../availability/availability.service';
import { AvailabilityComponent } from '../../availability/availability.component';
import { BadgeComponent } from '../../common/badge/badge.component';

@Component({
    selector: 'em-add-appointment',
    directives: [AddressComponent, CollapsibleContentComponent, ROUTER_DIRECTIVES, AvailabilityComponent, BadgeComponent],
    templateUrl: './add-appointment.component.html'
})
export class AddAppointmentComponent implements OnInit, OnDestroy {

    /**
     * init vars
     */
    activeClients: Client[] = [];
    activeStaff: Staff[] = [];
    active = true;
    subAppointmentClients: Subscription;
    subAppointmentStaff: Subscription;
    hasErrors: string[] = [];
    showAvailabilityForm: boolean = false;
    completionMessage: string;

    /**
     * model vars
     */
    appointment: Appointment;

    constructor(private appointmentService: AppointmentService, private router: Router) { }

    ngOnInit() {
        this.subAppointmentClients =
            this.appointmentService.fetchActiveClients().subscribe(clients => {
                this.activeClients = clients;
                if (clients.length < 1) {
                    this.hasErrors.push('Please add client/s before scheduling an appointment');
                }
            });
        this.subAppointmentStaff =
            this.appointmentService.fetchActiveStaff().subscribe(staff => {
                this.activeStaff = staff;
                if (staff.length < 1) {
                    this.hasErrors.push('Please add staff member/s before scheduling an appointment');
                }
            });

        this.initAppt();
    }

    ngOnDestroy() {
        this.subAppointmentClients.unsubscribe();
        this.subAppointmentStaff.unsubscribe();
    }

    create(appointment: Appointment): void {
        this.appointmentService.create(appointment).subscribe(res => {
            this.completionMessage = `Successfully created appointment: ${res.id}`;
            this.router.navigate(['/appointment']);
        }, error => {
            this.completionMessage = `Unable to create appointment: ${error}`;
        });
    }

    useStaffAddress(): void {
        if(this.appointment.staff) {
            this.appointment.location = this.appointment.staff.address;
        }
    }

    useClientAddress(): void {
        if(this.appointment.client) {
            this.appointment.location = this.appointment.client.address;
        }
    }

    clear(): void {
        this.initAppt();
    }

    addAvailability() {
        this.showAvailabilityForm = true;
    }

    availabilityUpdated(availability: Availability[]): void {
        this.showAvailabilityForm = false;
        this.appointment.fromDate = availability[0].fromDate;
        this.appointment.toDate = availability[0].toDate;
    }

    private initAppt() {
        this.appointment = new Appointment();
        this.appointment.location = new Address();
    }
}