import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Client, Staff, Address, Appointment, Availability } from '../../model/model';
import { AppointmentService } from '../appointment.service';
import { AddressComponent } from '../../address/address.component';
import { CollapsibleContentComponent } from '../../common/collapsible-content/collapsible-content.component';
import { AvailabilityService } from '../../availability/availability.service';
import { AvailabilityComponent } from '../../availability/availability.component';
import { BadgeComponent } from '../../common/badge/badge.component';

@Component({
    selector: 'em-edit-appointment',
    directives: [AddressComponent, CollapsibleContentComponent, ROUTER_DIRECTIVES, AvailabilityComponent, BadgeComponent],
    templateUrl: './edit-appointment.component.html'
})
export class EditAppointmentComponent implements OnInit, OnDestroy {

    /**
     * init vars
     */
    activeClients: Client[] = [];
    activeStaff: Staff[] = [];
    active = true;
    hasErrors: string[] = [];
    showAvailabilityForm: boolean = false;
    completionMessage: string;
    updateStaff: boolean = false;
    updateClient: boolean = false;

    /**
     * Unsubscribales
     */
    private subRoute: Subscription;
    private subApptService: Subscription;
    private subAppointmentClients: Subscription;
    private subAppointmentStaff: Subscription;
    private subAvailabilityDismiss: Subscription;

    /**
     * model
     */
    appointment: Appointment;

    constructor(private appointmentService: AppointmentService,
        private route: ActivatedRoute,
        private availabilityService: AvailabilityService,
        private router: Router) {

        this.subRoute = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.subApptService = this.appointmentService.fetchById(id)
                .subscribe(appt => this.appointment = appt, error => console.error(error));
        });
    }

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

        this.subAvailabilityDismiss =
            this.availabilityService.cancelAvailabilityForm$.subscribe(dismiss => this.showAvailabilityForm = dismiss);
    }

    ngOnDestroy() {
        this.subRoute.unsubscribe();
        this.subApptService.unsubscribe();
        this.subAvailabilityDismiss.unsubscribe();
        this.subAppointmentStaff.unsubscribe();
        this.subAppointmentClients.unsubscribe();
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
        if (this.appointment.staff) {
            this.appointment.location = this.appointment.staff.address;
        }
    }

    useClientAddress(): void {
        if (this.appointment.client) {
            this.appointment.location = this.appointment.client.address;
        }
    }

    showStaffSelect() {
        this.updateStaff = !this.updateStaff;
    }

    showClientSelect() {
        this.updateClient = !this.updateClient;
    }

    addAvailability() {
        this.showAvailabilityForm = true;
    }

    availabilityUpdated(availability: Availability[]): void {
        this.showAvailabilityForm = false;
        this.appointment.fromDate = availability[0].fromDate;
        this.appointment.toDate = availability[0].toDate;
    }
}