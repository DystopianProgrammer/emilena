import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { StaffComponent } from '../staff/staff.component';
import { ClientComponent } from '../client/client.component';
import { AddStaffComponent } from '../staff/add-staff/add-staff.component';
import { AddClientComponent } from '../client/add-client/add-client.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthenticationService, AuthenticatedUser, AuthenticationStatus } from '../authentication/authentication.service';
import { User } from '../model/model';

@Component({
  selector: 'emilena',
  templateUrl: './app.component.html',
  directives: [ROUTER_DIRECTIVES, HeaderComponent, FooterComponent],
  providers: [AuthenticationService],
  precompile: [HeaderComponent, HomeComponent, StaffComponent, AddStaffComponent, ClientComponent, AddClientComponent, FooterComponent]
})
export class AppComponent {
  constructor(private authenticationService: AuthenticationService) { }
}
