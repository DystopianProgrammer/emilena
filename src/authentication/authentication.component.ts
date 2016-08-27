import { Component } from '@angular/core';

import { User } from '../model/model';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'em-authentication',
    templateUrl: './authentication.component.html'
})
export class AuthenticationComponent {

    user: User = new User();
    hasAuthenticationFailure: boolean;

    constructor(private authenticationService: AuthenticationService) {}

    submit() {
        this.authenticationService.authenticate(this.user).subscribe(usr => {
            this.user = usr;
        });
        this.authenticationService.notify(this.user);
    }
}