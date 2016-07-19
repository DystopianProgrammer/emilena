import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { StaffComponent } from '../staff/staff.component';
import { ClientComponent } from '../client/client.component';
import { AddStaffComponent } from '../staff/add-staff/add-staff.component';
import { AddClientComponent } from '../client/add-client/add-client.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'emilena',
  templateUrl: './app.component.html',
  directives: [ROUTER_DIRECTIVES, HeaderComponent, FooterComponent],
  precompile: [
    HeaderComponent,
    HomeComponent,
    StaffComponent,
    AddStaffComponent,
    ClientComponent,
    AddClientComponent,
    FooterComponent
  ]
})
export class AppComponent { }
