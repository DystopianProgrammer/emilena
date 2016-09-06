import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { StaffComponent } from '../person/staff/staff.component';
import { ClientComponent } from '../person/client/client.component';
import { AddStaffComponent } from '../person/staff/add-staff/add-staff.component';
import { EditStaffComponent } from '../person/staff/edit-staff/edit-staff.component';
import { AddClientComponent } from '../person/client/add-client/add-client.component';
import { EditClientComponent } from '../person/client/edit-client/edit-client.component';
import { AppointmentComponent } from '../appointments/appointment.component';
import { AddAppointmentComponent } from '../appointments/add/add-appointment.component';
import { EditAppointmentComponent } from '../appointments/edit/edit-appointment.component';
import { AlertsComponent } from '../alerts/alerts.component';
import { ErrorPageComponent } from '../common/error/error.page.component';

// providers
import { Session } from '../session/session';
import { AuthenticationService } from '../authentication/authentication.service';
import { AlertsService } from '../alerts/alerts.service';
import { AppointmentService } from '../appointments/appointment.service';
import { AvailabilityService } from '../availability/availability.service';
import { LoaderService } from '../common/loader/loader.service';
import { HttpMethods } from '../common/http/http.methods';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      StaffComponent,
      ClientComponent,
      AddStaffComponent,
      EditStaffComponent,
      AddClientComponent,
      EditClientComponent,
      AppointmentComponent,
      AddAppointmentComponent,
      EditAppointmentComponent,
      AlertsComponent,
      ErrorPageComponent
  ],
  bootstrap: [AppComponent],
    providers: [
        Session,
        AuthenticationService,
        AppointmentService,
        AvailabilityService,
        LoaderService,
        AlertsService,
        HttpMethods
    ]
})
export class AppModule {
}