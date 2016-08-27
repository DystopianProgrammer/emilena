import { Routes, RouterModule } from '@angular/router';

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

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'client', component: ClientComponent },
  { path: 'add-staff', component: AddStaffComponent },
  { path: 'edit-staff/:id', component: EditStaffComponent },
  { path: 'add-client', component: AddClientComponent },
  { path: 'edit-client/:id', component: EditClientComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'add-appointment', component: AddAppointmentComponent },
  { path: 'edit-appointment/:id', component: EditAppointmentComponent }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });