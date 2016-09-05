import { Component } from '@angular/core';

import { SystemUser } from '../model/model';
import { AuthenticationService } from './authentication.service';
import { LoaderService } from '../common/loader/loader.service';
import { AlertsService } from '../alerts/alerts.service';

@Component({
    selector: 'em-authentication',
    templateUrl: './authentication.component.html'
})
export class AuthenticationComponent {

    user: SystemUser = new SystemUser();
    hasAuthenticationFailure: boolean;

    constructor(private authenticationService: AuthenticationService,
        private alertsService: AlertsService,
        private loaderService: LoaderService) { }

    submit() {
        setTimeout(() => this.loaderService.notifyIsLoaded(true), 1000);
        this.loaderService.notifyIsLoaded(false);
        this.authenticationService.authenticate(this.user)
            .subscribe(usr => {
                this.user = usr;
                this.hasAuthenticationFailure = false;
                this.authenticationService.notify(this.user);
                if (usr.staff) {
                    this.alertsService.pendingAppointmentsByStaffId(usr.staff.id);
                }
            }, err => {
                this.hasAuthenticationFailure = true;
            });
    }
}