import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { StaffComponent } from '../person/staff/staff.component';
import { ClientComponent } from '../person/client/client.component';
import { AddStaffComponent } from '../person/staff/add-staff/add-staff.component';
import { AddClientComponent } from '../person/client/add-client/add-client.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { AppointmentComponent } from '../appointments/appointment.component';

@Component({
  selector: 'emilena',
  templateUrl: './app.component.html',
  directives: [ROUTER_DIRECTIVES, HeaderComponent, FooterComponent],
  providers: [AuthenticationService],
  precompile: [
    HeaderComponent,
    HomeComponent,
    StaffComponent,
    AddStaffComponent,
    ClientComponent,
    AddClientComponent,
    FooterComponent,
    AppointmentComponent
  ]
})
export class AppComponent {
  constructor(private authenticationService: AuthenticationService) { }
}
