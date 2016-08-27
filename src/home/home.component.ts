import { Component, AfterViewInit } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
    selector: 'em-home',
    templateUrl: './home.component.html',
    directives: [AuthenticationComponent]
})
export class HomeComponent implements AfterViewInit {

    displayLoginForm: boolean = true;

    constructor(private authenticationService: AuthenticationService) { }

    ngAfterViewInit() {
        this.authenticationService.userObservable$.subscribe(user => {
            if (user && user.userName && user.password) {
                this.displayLoginForm = false;
            } else {
                this.displayLoginForm = true;
            }
        });
    }
}