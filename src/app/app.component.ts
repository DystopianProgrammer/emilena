import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { StaffComponent } from '../person/staff/staff.component';
import { ClientComponent } from '../person/client/client.component';
import { AddStaffComponent } from '../person/staff/add-staff/add-staff.component';
import { EditStaffComponent } from '../person/staff/edit-staff/edit-staff.component';
import { AddClientComponent } from '../person/client/add-client/add-client.component';
import { EditClientComponent } from '../person/client/edit-client/edit-client.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { AppointmentComponent } from '../appointments/appointment.component';
import { AddAppointmentComponent } from '../appointments/add/add-appointment.component';
import { EditAppointmentComponent } from '../appointments/edit/edit-appointment.component';
import { AppointmentService } from '../appointments/appointment.service';
import { AvailabilityService } from '../availability/availability.service';

@Component({
    selector: 'emilena',
    templateUrl: './app.component.html',
    directives: [ROUTER_DIRECTIVES, HeaderComponent, FooterComponent],
    providers: [AuthenticationService, AppointmentService, AvailabilityService],
    precompile: [
        HeaderComponent,
        HomeComponent,
        StaffComponent,
        AddStaffComponent,
        EditStaffComponent,
        ClientComponent,
        AddClientComponent,
        EditClientComponent,
        FooterComponent,
        AppointmentComponent,
        AddAppointmentComponent,
        EditAppointmentComponent

    ]
})
export class AppComponent {

    constructor(private router: Router, private authenticationService: AuthenticationService) {
        if (!authenticationService.authenticatedUser) {
            this.router.navigate(['/']);
        }
    }
}
