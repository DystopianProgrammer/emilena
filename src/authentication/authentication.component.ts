import { Component } from '@angular/core';

import { User } from '../model/model';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'em-authentication',
    templateUrl: './authentication.component.html',
    providers: [AuthenticationService]
})
export class AuthenticationComponent {

    user: User = new User();
    authenticated: boolean;

    constructor(private authenticationService: AuthenticationService) { }

    submit() {
        this.authenticationService.submit(this.user).subscribe(res => {
            this.authenticated = res;
        }, err => this.authenticated = true);
    }
}