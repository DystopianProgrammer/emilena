import { Component, Output, EventEmitter } from '@angular/core';

import { User } from '../model/model';
import { AuthenticationService, AuthenticatedUser, AuthenticationStatus } from './authentication.service';

@Component({
    selector: 'em-authentication',
    templateUrl: './authentication.component.html'
})
export class AuthenticationComponent {

    user: User = new User();
    hasAuthenticationFailure: boolean;

    @Output() displayLoginForm = new EventEmitter<boolean>();

    constructor(private authenticationService: AuthenticationService) {
        this.hasAuthenticationFailure = false;
    }

    submit() {
        this.authenticationService.authenticate(this.user).subscribe(response => {
            this.displayLoginForm.emit(false);
        }, err => this.hasAuthenticationFailure = true);
    }
}