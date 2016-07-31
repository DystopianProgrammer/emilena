import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { NavBarItemHeaderComponent } from './navbar-item-header.component.ts';
import { NavBarComponentItem } from './navbar-item.component';
import { NavBarService } from './navbar.service';
import { AuthenticationService, AuthenticatedUser, AuthenticationStatus } from '../authentication/authentication.service.ts'

/**
 * aria = true
 * remove collapse
 * add in
 */
@Component({
    selector: 'em-nav-bar',
    templateUrl: './navbar.component.html',
    directives: [ROUTER_DIRECTIVES, NavBarItemHeaderComponent, NavBarComponentItem],
    providers: [NavBarService]
})
export class NavbarComponent {

    isCollapsed: boolean = true;
    authenticatedUser: AuthenticatedUser = new AuthenticatedUser();

    constructor(private navbarService: NavBarService, private authenticationService: AuthenticationService) {

        // responsive requirements
        this.navbarService.toggleNavBar$.subscribe(toggle => this.isCollapsed = !toggle);

        // listen for changes on authentication status
        this.authenticationService.authenticatedUserSource$.subscribe(user => {
            this.authenticatedUser = user;
        });
    }

    toggle(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    logout(): void {
        this.authenticatedUser.authenticationStatus = AuthenticationStatus.LOGGED_OUT;
        this.authenticationService.notifyAuthenticationStatus(this.authenticatedUser);
    }
}