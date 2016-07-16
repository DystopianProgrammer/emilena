import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { StaffComponent } from '../staff/staff.component';
import { ClientComponent } from '../client/client.component';
import { AddStaffComponent } from '../staff/add-staff/add-staff.component';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'client', component: ClientComponent },
  { path: 'add-staff', component: AddStaffComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];