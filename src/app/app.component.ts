import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthenticationService } from '../authentication/authentication.service';

import { LoaderComponent } from '../common/loader/loader.component';

@Component({
    selector: 'emilena',
    templateUrl: './app.component.html',
    directives: [HeaderComponent, FooterComponent, LoaderComponent]
})
export class AppComponent {

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.restoreSession();
    }
}
