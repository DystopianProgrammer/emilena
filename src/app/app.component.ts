import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  directives: [ROUTER_DIRECTIVES],
  precompile: [HomeComponent, ProfileComponent]
})
export class AppComponent { }
