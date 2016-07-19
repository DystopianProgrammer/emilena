import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Staff, Client } from '../model/model';
import { StaffService } from '../staff/staff.service';
import { ClientService } from '../client/client.service';

@Component({
    selector: 'em-support',
    templateUrl: './support.component.html',
    providers: [StaffService]
})
export class SupportComponent implements OnInit, OnDestroy {

    errorMsg: string;
    @Input() client: any;
    staffList: Staff[] = [];

    private staffListSub$: Subscription;
    private clientSub$: Subscription;

    constructor(private staffService: StaffService, private clientService: ClientService) { }

    ngOnInit() {
        this.staffListSub$ = this.staffService.findAll().subscribe(res => {
            this.staffList = res;
        }, err => {
            this.errorMsg = err;
        });
    }

    ngOnDestroy() {
        if (this.staffListSub$) {
            this.staffListSub$.unsubscribe();
        }

        if (this.clientSub$) {
            this.clientSub$.unsubscribe();
        }
    }

    // TODO - update row with staff client relationship i.e. assigned support worker/s
    link(staff: Staff) {
        this.client.staff = new Array(staff);
        this.clientSub$ = this.clientService.addClient(this.client).subscribe(res => {
            console.log(res);
        }, err => {
            console.log(err);
        });
    }
}