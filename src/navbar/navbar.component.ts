import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { NavBarItemHeaderComponent } from './navbar-item-header.component.ts';
import { NavBarComponentItem } from './navbar-item.component';
import { NavBarService } from './navbar.service';

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

    constructor(private navbarService: NavBarService) {
        this.navbarService.toggleNavBar$.subscribe(toggle => this.isCollapsed = !toggle);
    }

    toggle(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}