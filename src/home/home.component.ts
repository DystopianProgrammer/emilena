import { Component, OnInit } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { LoaderService } from '../common/loader/loader.service';

@Component({
    selector: 'em-home',
    templateUrl: './home.component.html',
    directives: [AuthenticationComponent]
})
export class HomeComponent implements OnInit {

    displayLoginForm: boolean = true;

    constructor(private authenticationService: AuthenticationService, private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.authenticationService.authenticatedUserSource$.subscribe(user => {
            if (user.authenticationStatus === 0) {
                this.displayLoginForm = false;
            } else {
                this.displayLoginForm = true;
            }
        });
        this.loaderService.notifyIsLoaded(true);
    }

    hideLoginForm(hide: boolean): void {
        setTimeout(() => {
            this.loaderService.notifyIsLoaded(true);
        }, 1000);
        this.loaderService.notifyIsLoaded(false);
        this.displayLoginForm = hide;
    }
}