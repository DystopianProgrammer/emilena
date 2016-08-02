import { Component, Input } from '@angular/core';


@Component({
    selector: 'em-navbar-item-header',
    templateUrl: './navbar-item-header.component.html'
})
export class NavBarItemHeaderComponent {

    @Input() isOpen: any;
    @Input() heading: any;
}