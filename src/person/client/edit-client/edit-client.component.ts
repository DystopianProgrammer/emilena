import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Client, Address, Availability, GeneralAvailability } from '../../../model/model';
import { ClientService } from '../client.service';
import { AddressComponent } from '../../../address/address.component';
import { PersonComponent } from '../../../person/person.component';
import { ValidationComponent } from '../../../validation/validation.component';
import { AvailabilityService } from '../../../availability/availability.service';
import { AvailabilityComponent } from '../../../availability/availability.component';
import { BadgeComponent } from '../../../common/badge/badge.component';
import { CollapsibleContentComponent } from '../../../common/collapsible-content/collapsible-content.component';
import { CommonActions } from '../../../person/common-actions';
import { ArrayDelimiter } from '../../../common/pipes/array-delimiter';
import { GeneralAvailabilityPipe } from '../../../common/pipes/general-availability.pipe';
import { SupportComponent } from '../../../support/support.component';

@Component({
    selector: 'em-edit-client',
    templateUrl: './edit-client.component.html',
    directives: [PersonComponent,
        AddressComponent,
        ValidationComponent,
        AvailabilityComponent,
        SupportComponent,
        CollapsibleContentComponent,
        BadgeComponent],
    pipes: [GeneralAvailabilityPipe, ArrayDelimiter],
    providers: [ClientService]
})
export class EditClientComponent extends CommonActions implements OnInit, OnDestroy {

    private subClientService: any;
    private subRoute: any;

    constructor(private clientService: ClientService,
        private route: ActivatedRoute,
        private router: Router) {

        super(new Client());
    }

    ngOnInit() {
        this.subRoute = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.subClientService = this.clientService.findById(id).subscribe(client => {
                super.setPerson(client);
            }, error => console.error(error));
        });
    }

    ngOnDestroy() {
        this.subRoute.unsubscribe();
        this.subClientService.unsubscribe();
    }

    update(client: Client) {
        this.subClientService = this.clientService.update(client)
            .subscribe(res => {
                this.router.navigate(['/client']);
            }, error => console.error(error));
    }
}