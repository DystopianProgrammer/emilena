import { Component, OnInit } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
    selector: 'em-home',
    templateUrl: './home.component.html',
    directives: [AuthenticationComponent]
})
export class HomeComponent implements OnInit {

    displayLoginForm: boolean;

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.displayLoginForm = (this.authenticationService.hasSession()) ? false : true;
    }

    hideLoginForm(event: boolean): void {
        this.displayLoginForm = event;
    }
}