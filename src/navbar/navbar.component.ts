import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

/**
 * aria = true
 * remove collapse
 * add in
 */
@Component({
    selector: 'em-nav-bar',
    templateUrl: './navbar.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent {

    collapse: string = 'collapse';

    toggle(): void {
        this.collapse = (this.collapse === 'collapse') ? '' : 'collapse';
    }

    hide(): void {
        this.collapse = 'collapse';
    }
}