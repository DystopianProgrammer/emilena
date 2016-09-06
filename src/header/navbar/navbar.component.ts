import { Component } from '@angular/core';

import { NavBarService } from './navbar.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { LoaderService } from '../../common/loader/loader.service';
import { SystemUser } from '../../model/model';
import { AlertsService } from '../../alerts/alerts.service';

@Component({
    selector: 'em-nav-bar',
    templateUrl: './navbar.component.html',
    providers: [NavBarService]
})
export class NavbarComponent {

    // For menu toggling
    isCollapsed: boolean = true;
    isClientMenuOpen: boolean = false;
    isStaffMenuOpen: boolean = false;
    isAppointmentMenuOpen: boolean = false;

    user: SystemUser;
    alerts: string;
    hasAlerts: boolean = false;

    constructor(private navbarService: NavBarService,
        private loaderService: LoaderService,
        private alertsService: AlertsService,
        private authenticationService: AuthenticationService) {

        this.navbarService.toggleNavBar$.subscribe(toggle => this.isCollapsed = !toggle);
        this.authenticationService.userObservable$.subscribe(user => {
            if (user && user.userName) {
                this.user = user;
                if (user.staff) {
                    this.alertsService.pendingAppointmentsByStaffId(user.staff.id).subscribe(alerts => {
                        if(alerts && alerts.pendingAlerts && alerts.pendingAlerts.length > 0) {
                            this.hasAlerts = true;
                            this.alerts = alerts.pendingAlerts.length.toString();
                        }
                    });
                }
            }
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
        this.user = undefined;
    }

    sendNoticationToCloseNavBar() {
        this.navbarService.toggleNavBar(false);
    }

    openClientMenu() {
        this.isStaffMenuOpen = false;
        this.isAppointmentMenuOpen = false;
        this.isClientMenuOpen = !this.isClientMenuOpen;
    }

    openStaffMenu() {
        this.isClientMenuOpen = false;
        this.isAppointmentMenuOpen = false;
        this.isStaffMenuOpen = !this.isStaffMenuOpen;
    }

    openAppointmentMenu() {
        this.isStaffMenuOpen = false;
        this.isClientMenuOpen = false;
        this.isAppointmentMenuOpen = !this.isAppointmentMenuOpen;
    }
}