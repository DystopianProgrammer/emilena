import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { StaffComponent } from '../staff/staff.component';
import { ClientComponent } from '../client/client.component'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  directives: [ROUTER_DIRECTIVES],
  precompile: [HomeComponent, StaffComponent, ClientComponent]
})
export class AppComponent { }
