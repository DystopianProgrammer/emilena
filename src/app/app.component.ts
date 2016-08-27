import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { AppointmentService } from '../appointments/appointment.service';
import { AvailabilityService } from '../availability/availability.service';
import { LoaderService } from '../common/loader/loader.service';
import { LoaderComponent } from '../common/loader/loader.component';
import { Session } from '../session/session';

@Component({
    selector: 'emilena',
    templateUrl: './app.component.html',
    directives: [ROUTER_DIRECTIVES, HeaderComponent, FooterComponent, LoaderComponent],
    providers: [AuthenticationService, AppointmentService, AvailabilityService, LoaderService, Session]
})
export class AppComponent {

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.restoreSession();
    }
}
