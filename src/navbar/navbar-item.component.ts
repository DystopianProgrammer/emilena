import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { NavBarService } from './navbar.service';

@Component({
    selector: 'em-navbar-item',
    templateUrl: './navbar-item.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NavBarComponentItem {

    @Input() title: any;
    @Input() emRoute: any;

    constructor(private navbarService: NavBarService) {}

    sendNoticationToCloseNavBar() {
        this.navbarService.toggleNavBar(false);
    }
}