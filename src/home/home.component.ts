import { Component, OnInit } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AuthenticationService, AuthenticationStatus, AuthenticatedUser } from '../authentication/authentication.service';

@Component({
    selector: 'em-home',
    templateUrl: './home.component.html',
    directives: [AuthenticationComponent]
})
export class HomeComponent {

    displayLoginForm: boolean;

    constructor(private authenticationService: AuthenticationService) {

        // initialise based on the current state
        this.authenticationService.getSessionStatus(sessionState => {
            let authenticatedUser = new AuthenticatedUser();
            authenticatedUser.name = sessionState.user;
            if (sessionState.user) {
                this.displayLoginForm = false;
                authenticatedUser.authenticationStatus = AuthenticationStatus.LOGGED_IN;
            } else {
                this.displayLoginForm = true;
                authenticatedUser.authenticationStatus = AuthenticationStatus.LOGGED_OUT;
            }
            this.authenticationService.notifyAuthenticationStatus(authenticatedUser);
        });

        // listen for changes to the login state
        this.authenticationService.authenticatedUserSource$.subscribe(user => {
            if (user.authenticationStatus === AuthenticationStatus.LOGGED_OUT) {
                this.displayLoginForm = true;
            } else {
                this.displayLoginForm = false;
            }
        });
    }

    hideLoginForm(event: boolean): void {
        this.displayLoginForm = event;
    }
}