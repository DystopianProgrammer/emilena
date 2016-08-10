import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Client, Address } from '../../../model/model';
import { ClientService } from '../client.service';
import { PopOverComponent } from '../../../common/pop-over/pop-over.component';
import { Unspecified } from '../../../common/pipes/unspecified.pipe';
import { LoaderService } from '../../../common/loader/loader.service';

@Component({
    selector: 'em-client-list',
    templateUrl: './client-list.component.html',
    directives: [PopOverComponent, ROUTER_DIRECTIVES],
    pipes: [Unspecified],
    providers: [ClientService]
})
export class ClientListComponent implements OnInit, OnDestroy {

    clientList: Client[] = [];
    errorMessage: string;
    displaySupportWorkers: boolean;
    indexed: number;

    private staffFetchAll$: Subscription;

    constructor(private clientService: ClientService, private loaderService: LoaderService) { }

    ngOnInit() {
        this.loaderService.notifyIsLoaded(false);
        this.staffFetchAll$ = this.clientService.findAll()
            .subscribe(res => {
                this.clientList = res;
                this.loaderService.notifyIsLoaded(true);
            }, error => this.errorMessage = error);
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