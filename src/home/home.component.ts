import { Component } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { AlertsService } from '../alerts/alerts.service';

@Component({
    selector: 'em-home',
    templateUrl: './home.component.html',
    directives: [AuthenticationComponent]
})
export class HomeComponent {

    displayLoginForm: boolean;

    constructor(private authenticationService: AuthenticationService, private alertsService: AlertsService) {
        this.authenticationService.userObservable$.subscribe(user => {
            this.displayLoginForm = (user && user.userName) ? false : true;
        });
    }
}