import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Client, Address } from '../../model/model';
import { ClientService } from '../client.service';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
    selector: 'em-client-list',
    templateUrl: './client-list.component.html',
    directives: [PaginationComponent],
    providers: [ClientService]
})
export class ClientListComponent implements OnInit, OnDestroy {

    clientList: Client[] = [];
    errorMessage: string;

    private staffFetchAll$: Subscription;

    constructor(private clientService: ClientService) { }

    ngOnInit() {
        this.staffFetchAll$ = this.clientService.findAll()
            .subscribe(clientList => {
                this.clientList = clientList.map(client => {
                    if(client.address === null) {
                        client.address = new Address();
                    } else {
                        let addressParser = (client: Client) => {
                            return (client.address.town && client.address.postCode) ?
                                    `${client.address.town}, ${client.address.postCode}` : '';
                        }
                        client.address.friendlyAddress = addressParser(client);
                    }
                    return client;
                });
            },
            error => {
                this.errorMessage = <any>error
            });
    }

    ngOnDestroy() {
        if (this.staffFetchAll$) {
            this.staffFetchAll$.unsubscribe();
        }
    }
}