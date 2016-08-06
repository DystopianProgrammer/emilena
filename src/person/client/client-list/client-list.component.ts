import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Client, Address } from '../../../model/model';
import { ClientService } from '../client.service';
import { PaginationComponent } from '../../../pagination/pagination.component';
import { PopOverComponent } from '../../../common/pop-over/pop-over.component';
import { Unspecified } from '../../../common/pipes/unspecified.pipe';

@Component({
    selector: 'em-client-list',
    templateUrl: './client-list.component.html',
    directives: [PaginationComponent, PopOverComponent],
    pipes: [Unspecified],
    providers: [ClientService]
})
export class ClientListComponent implements OnInit, OnDestroy {

    clientList: Client[] = [];
    errorMessage: string;
    displaySupportWorkers: boolean;
    indexed: number;

    private staffFetchAll$: Subscription;

    constructor(private clientService: ClientService) { }

    ngOnInit() {
        this.staffFetchAll$ = this.clientService.findAll()
            .subscribe(clientList => {
                this.clientList = clientList.map(client => {
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

    toggle(client: Client, index: number) {
        if (this.displaySupportWorkers) {
            this.displaySupportWorkers = false;
        } else {
            if (this.clientList[index].id === client.id) {
                this.displaySupportWorkers = true;
                this.indexed = index;
            } else {
                this.displaySupportWorkers = false;
            }
        }
    }
}