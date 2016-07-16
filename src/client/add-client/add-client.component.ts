import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Client, Address } from '../../model/model';
import { ClientService } from '../client.service';
import { AddressComponent } from '../../address/address.component';
import { PersonComponent } from '../../person/person.component';
import { ValidationComponent } from '../../validation/validation.component';


@Component({
    selector: 'em-client',
    templateUrl: './add-client.component.html',
    directives: [PersonComponent, AddressComponent, ROUTER_DIRECTIVES, ValidationComponent],
    providers: [ClientService]
})
export class AddClientComponent {

    client: Client;
    errors: any;
    successMsg: string;

    private clientAdd$: Subscription;

    constructor(private clientService: ClientService) {
        this.initClient();
    }

    addClient(client: Client) {
        this.clientAdd$ = this.clientService.addClient(client)
            .subscribe(res => {
                this.successMsg = `Client ${res} successfully created`;
            }, error => {
                this.errors = error;
                setTimeout(() => {
                    this.errors = undefined;
                }, 5000);
            });

        this.initClient();
    }

    ngOnDestroy() {
        if (this.clientAdd$) {
            this.clientAdd$.unsubscribe();
        }
    }

    cancel(): void {
        this.initClient();
    }

    private initClient(): void {
        this.client = new Client();
        this.client.address = new Address();
    }
}