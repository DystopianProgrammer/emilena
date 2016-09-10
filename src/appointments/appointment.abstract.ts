import * as moment from 'moment';

import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Client, Staff, Appointment, Availability } from '../model/model';
import { AppointmentService } from './appointment.service';
import { AvailabilityService } from '../availability/availability.service';
import { LoaderService } from '../common/loader/loader.service';

export abstract class AbstractAppointment implements OnInit, OnDestroy {

    appointment: Appointment;
    activeClients: Client[] = [];
    activeStaff: Staff[] = [];
    active = true;
    hasErrors: string[] = [];
    showAvailabilityForm: boolean = false;
    completionMessage: string;
    dateValidationMsg: string;

    private subRoute: Subscription;
    private subApptService: Subscription;
    private subAppointmentClients: Subscription;
    private subAppointmentStaff: Subscription;
    private subAvailabilityDismiss: Subscription;

    private appointmentService: AppointmentService;
    private route: ActivatedRoute;
    private loaderService: LoaderService;
    private availabilityService: AvailabilityService;
    private router: Router;

    constructor(
        appointmentService: AppointmentService,
        route: ActivatedRoute,
        loaderService: LoaderService,
        availabilityService: AvailabilityService,
        router: Router) {

        this.appointmentService = appointmentService;
        this.route = route;
        this.loaderService = loaderService;
        this.availabilityService = availabilityService;
        this.router = router;

        this.subRoute = route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            if (id) {
                this.subApptService = this.appointmentService.fetchById(id)
                    .subscribe(appt => this.appointment = appt, error => console.error(error));
            }
        });
    }

    ngOnInit() {
        this.loaderService.notifyIsLoaded(false);
        this.subAvailabilityDismiss =
            this.availabilityService.cancelAvailabilityForm$.subscribe(dismiss => this.showAvailabilityForm = dismiss);

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
                this.loaderService.notifyIsLoaded(true);
                if (staff.length < 1) {
                    this.hasErrors.push('Please add staff member/s before scheduling an appointment');
                }
            });
    }

    ngOnDestroy() {
        if (this.subRoute) { this.subRoute.unsubscribe(); }
        if (this.subApptService) { this.subApptService.unsubscribe(); }
        if (this.subAvailabilityDismiss) { this.subAvailabilityDismiss.unsubscribe(); }
        if (this.subAppointmentStaff) { this.subAppointmentStaff.unsubscribe(); }
        if (this.subAppointmentClients) { this.subAppointmentClients.unsubscribe(); }
    }

    create(appointment: Appointment): void {
        this.dateValidationMsg = this.appointmentService.validate(appointment);
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

    addAvailability() {
        this.showAvailabilityForm = true;
    }

    availabilityUpdated(availability: Availability[]): void {
        this.showAvailabilityForm = false;
        this.appointment.appointmentDate = availability[0].date;
        this.appointment.startTime = moment(availability[0].fromTime).format('HH:MM');
        this.appointment.endTime = moment(availability[0].toTime).format('HH:MM');
    }

    removeTime() {
        this.appointment.startTime = null;
        this.appointment.endTime = null;
    }
}