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
    authenticatedUser: AuthenticatedUser;

    constructor(private navbarService: NavBarService, private authenticationService: AuthenticationService) {
        this.navbarService.toggleNavBar$.subscribe(toggle => this.isCollapsed = !toggle);
    }

    ngOnInit() {
        this.authenticationService.authenticatedUserSource$.subscribe(au => {
            this.authenticatedUser = au;
        });
    }

    toggle(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}