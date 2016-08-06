import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { StaffComponent } from '../person/staff/staff.component';
import { ClientComponent } from '../person/client/client.component';
import { AddStaffComponent } from '../person/staff/add-staff/add-staff.component';
import { AddClientComponent } from '../person/client/add-client/add-client.component';
import { AppointmentComponent } from '../appointments/appointment.component';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'client', component: ClientComponent },
  { path: 'add-staff', component: AddStaffComponent },
  { path: 'add-client', component: AddClientComponent },
  { path: 'appointment', component: AppointmentComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];