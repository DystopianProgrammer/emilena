import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';

@Component({
    selector: 'em-client',
    templateUrl: './client.component.html',
    directives: [ClientListComponent, ROUTER_DIRECTIVES]
})
export class ClientComponent {

}