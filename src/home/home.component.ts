import { Component } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';

@Component({
    selector: 'em-home',
    templateUrl: './home.component.html',
    directives: [AuthenticationComponent]
})
export class HomeComponent {

}