import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Client, Address, Availability } from '../../../model/model';
import { ClientService } from '../client.service';
import { AddressComponent } from '../../../address/address.component';
import { PersonComponent } from '../../../person/person.component';
import { ValidationComponent } from '../../../validation/validation.component';
import { SupportComponent } from '../../../support/support.component';
import { CollapsibleContentComponent } from '../../../common/collapsible-content/collapsible-content.component';
import { AvailabilityComponent } from '../../../availability/availability.component';
import { CommonActions } from '../../../person/common-actions';

@Component({
    selector: 'em-client',
    templateUrl: './add-client.component.html',
    directives: [
        PersonComponent,
        AddressComponent,
        ROUTER_DIRECTIVES,
        ValidationComponent,
        CollapsibleContentComponent,
        AvailabilityComponent,
        SupportComponent
    ],
    pipes: [],
    providers: [ClientService]
})
export class AddClientComponent extends CommonActions {

    errors: any;
    successMsg: string;
    active = true;

    constructor(private clientService: ClientService, private router: Router) {
        super(new Client());
    }

    addClient(client: Client) {
        this.clientService.add(client)
            .subscribe(res => {
                this.successMsg = `Client ${res} successfully created`;
                this.router.navigate(['/client']);
            }, error => this.errors = error);
    }
}