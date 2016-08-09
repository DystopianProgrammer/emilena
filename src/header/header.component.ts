import { Component } from '@angular/core';
import { NavbarComponent } from '../header/navbar/navbar.component';

@Component({
    selector: 'em-header',
    templateUrl: './header.component.html',
    directives: [NavbarComponent]
})
export class HeaderComponent {
}
