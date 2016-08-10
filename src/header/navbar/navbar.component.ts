import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { NavBarService } from './navbar.service';
import { AuthenticationService, AuthenticatedUser, AuthenticationStatus } from '../../authentication/authentication.service';
import { LoaderService } from '../../common/loader/loader.service';

@Component({
    selector: 'em-nav-bar',
    templateUrl: './navbar.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [NavBarService]
})
export class NavbarComponent {

    isCollapsed: boolean = true;
    authenticatedUser: AuthenticatedUser;
    isClientMenuOpen: boolean = false;
    isStaffMenuOpen: boolean = false;

    constructor(private navbarService: NavBarService,
                private loaderService: LoaderService,
                private authenticationService: AuthenticationService) {

        this.navbarService.toggleNavBar$.subscribe(toggle => this.isCollapsed = !toggle);
        this.authenticationService.authenticatedUserSource$.subscribe(authenticatedUser => {
            this.authenticatedUser = authenticatedUser;
        });
    }

    toggle(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    logout(): void {
        setTimeout(() => {
            this.loaderService.notifyIsLoaded(true);
        }, 1000);
        this.loaderService.notifyIsLoaded(false);

        this.sendNoticationToCloseNavBar();
        this.authenticatedUser = new AuthenticatedUser(null, 1, null);
        this.authenticationService.notify(this.authenticatedUser);
    }

    sendNoticationToCloseNavBar() {
        this.navbarService.toggleNavBar(false);
    }

    openClientMenu() {
        this.isStaffMenuOpen = false;
        this.isClientMenuOpen = !this.isClientMenuOpen;
    }

    openStaffMenu() {
        this.isClientMenuOpen = false;
        this.isStaffMenuOpen = !this.isStaffMenuOpen;
    }
}