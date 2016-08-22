import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { NavBarService } from './navbar.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { LoaderService } from '../../common/loader/loader.service';
import { User } from '../../model/model';

@Component({
    selector: 'em-nav-bar',
    templateUrl: './navbar.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [NavBarService]
})
export class NavbarComponent {

    isCollapsed: boolean = true;
    isClientMenuOpen: boolean = false;
    isStaffMenuOpen: boolean = false;
    user: User;

    constructor(private navbarService: NavBarService,
        private loaderService: LoaderService,
        private authenticationService: AuthenticationService) {

        this.navbarService.toggleNavBar$.subscribe(toggle => this.isCollapsed = !toggle);
        this.authenticationService.userObservable$.subscribe(usr => {
            this.user = usr;
        });
    }

    toggle(): void {
        if (this.user) {
            this.isCollapsed = !this.isCollapsed;
        }
    }

    logout(): void {
        setTimeout(() => this.loaderService.notifyIsLoaded(true), 1000);
        this.loaderService.notifyIsLoaded(false);
        this.sendNoticationToCloseNavBar();
        this.authenticationService.removeSessionToken();
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