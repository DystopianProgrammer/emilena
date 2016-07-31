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
        this.authenticationService.login(this.user).subscribe(res => {
            this.displayLoginForm.emit(false);
            this.authenticationService.createSessionToken(this.user);
        }, err => this.hasAuthenticationFailure = true);
    }
}