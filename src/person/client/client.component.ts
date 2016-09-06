import { Component } from '@angular/core';
import { ClientListComponent } from './client-list/client-list.component';

@Component({
    selector: 'em-client',
    templateUrl: './client.component.html',
    directives: [ClientListComponent]
})
export class ClientComponent {

}