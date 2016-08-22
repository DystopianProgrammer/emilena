import { Component, OnInit } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { LoaderService } from '../common/loader/loader.service';

@Component({
    selector: 'em-home',
    templateUrl: './home.component.html',
    directives: [AuthenticationComponent]
})
export class HomeComponent {

    displayLoginForm: boolean = true;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.userObservable$.subscribe(user => {
            this.displayLoginForm = (user) ? false : true;
        });
    }
}