import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { StaffComponent } from '../staff/staff.component';
import { ClientComponent } from '../client/client.component';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'edit-staff', component: StaffComponent },
  { path: 'edit-client', component: ClientComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];