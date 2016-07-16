import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { StaffComponent } from '../staff/staff.component';
import { ClientComponent } from '../client/client.component';
import { AddStaffComponent } from '../staff/add-staff/add-staff.component';
import { AddClientComponent } from '../client/add-client/add-client.component';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'client', component: ClientComponent },
  { path: 'add-staff', component: AddStaffComponent },
  { path: 'add-client', component: AddClientComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];