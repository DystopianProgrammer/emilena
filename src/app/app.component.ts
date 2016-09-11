import { Component } from '@angular/core';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { DayOfWeekPipe } from '../common/pipes/day-of-week.pipe';
import { CapitalizeFirst } from '../common/pipes/capitalize.pipe';
import { AvailabilityTimePipe } from '../common/pipes/availability-time.pipe';
import { LoaderComponent } from '../common/loader/loader.component';
import { LocalTime } from '../common/pipes/local-time.pipe';
@Component({
    selector: 'emilena',
    templateUrl: './app.component.html',
    pipes: [LocalTime, DayOfWeekPipe, CapitalizeFirst, AvailabilityTimePipe],
    directives: [HeaderComponent, FooterComponent, LoaderComponent]
})
export class AppComponent {

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.restoreSession();
    }
}
