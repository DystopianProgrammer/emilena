import { Component } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
    selector: 'em-home',
    templateUrl: './home.component.html',
    directives: [AuthenticationComponent]
})
export class HomeComponent {

    displayLoginForm: boolean = true;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.authenticatedUserSource$.subscribe(user => {
            switch (user.authenticationStatus) {
                case 0: this.displayLoginForm = false; break;
                case 1: this.displayLoginForm = true; break;
                default: this.displayLoginForm = true;
            }
        });
    }

    hideLoginForm(hide: boolean): void {
        this.displayLoginForm = hide;
    }
}