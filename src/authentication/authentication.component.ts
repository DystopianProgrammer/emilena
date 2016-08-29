import { Component } from '@angular/core';

import { User } from '../model/model';
import { AuthenticationService } from './authentication.service';
import { LoaderService } from '../common/loader/loader.service';

@Component({
    selector: 'em-authentication',
    templateUrl: './authentication.component.html'
})
export class AuthenticationComponent {

    user: User = new User();
    hasAuthenticationFailure: boolean;

    constructor(private authenticationService: AuthenticationService, private loaderService: LoaderService) { }

    submit() {
        setTimeout(() => this.loaderService.notifyIsLoaded(true), 1000);
        this.loaderService.notifyIsLoaded(false);
        this.authenticationService.authenticate(this.user)
            .subscribe(usr => {
                this.user = usr;
                this.hasAuthenticationFailure = false;
                this.authenticationService.notify(this.user);
            }, err => {
                this.hasAuthenticationFailure = true;
            });
    }
}