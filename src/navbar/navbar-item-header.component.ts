import { Component, Input } from '@angular/core';

import { NavBarService } from './navbar.service';

@Component({
    selector: 'em-navbar-item-header',
    templateUrl: './navbar-item-header.component.html'
})
export class NavBarItemHeaderComponent {

    isOpen: boolean = false;
    @Input() heading: any;

    constructor(private navbarService: NavBarService) {
        this.navbarService.toggleNavBar$.subscribe(toggle => {
            this.isOpen = toggle;
        });
    }

    open() {
        this.isOpen = !this.isOpen;
    }
}