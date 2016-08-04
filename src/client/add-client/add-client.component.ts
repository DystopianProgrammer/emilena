import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Client, Address, Availability } from '../../model/model';
import { ClientService } from '../client.service';
import { AddressComponent } from '../../address/address.component';
import { PersonComponent } from '../../person/person.component';
import { ValidationComponent } from '../../validation/validation.component';
import { SupportComponent } from '../../support/support.component';
import { CollapsibleContentComponent } from '../../common/collapsible-content/collapsible-content.component';
import { AvailabilityComponent } from '../../availability/availability.component';
import { GeneralAvailabilityPipe } from '../../availability/general-availability.pipe';
import { CommonActions } from '../../person/common-actions';


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
    pipes: [GeneralAvailabilityPipe],
    providers: [ClientService]
})
export class AddClientComponent extends CommonActions {

    client: Client;
    errors: any;
    successMsg: string;
    active = true;

    private clientAdd$: Subscription;

    constructor(private clientService: ClientService) {
        super(new Client());

        this.client = <Client>super.person();
    }

    addClient(client: Client) {
        this.clientAdd$ = this.clientService.add(client)
            .subscribe(res => this.successMsg = `Client ${res} successfully created`, error => this.errors = error);
    }

    ngOnDestroy() {
        if (this.clientAdd$) {
            this.clientAdd$.unsubscribe();
        }
    }

    cancel(): void {
    }
}