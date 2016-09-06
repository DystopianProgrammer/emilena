import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Staff, Address } from '../../../model/model';
import { StaffService } from '../staff.service';
import { Unspecified } from '../../../common/pipes/unspecified.pipe';
import { ArrayDelimiter } from '../../../common/pipes/array-delimiter';
import { GeneralAvailabilityPipe } from '../../../common/pipes/general-availability.pipe';
import { FootCasePipe } from '../../../common/pipes/foot-case';
import { LoaderService } from '../../../common/loader/loader.service';

@Component({
    selector: 'em-staff-list',
    templateUrl: './staff-list.component.html',
    pipes: [Unspecified, ArrayDelimiter, GeneralAvailabilityPipe, FootCasePipe],
    providers: [StaffService]
})
export class StaffListComponent implements OnInit, OnDestroy {

    staffList: Staff[] = [];
    errorMessage: string;

    private staffFetchAll$: Subscription;
    private listClientsForStaff$: Subscription;

    constructor(private staffService: StaffService, private loaderService: LoaderService) { }

    ngOnInit() {
        this.loaderService.notifyIsLoaded(false);
        this.staffFetchAll$ = this.staffService.findAll()
            .subscribe(res => {
                this.staffList = res;
                this.loaderService.notifyIsLoaded(true);
            }, err => this.errorMessage = err);
    }

    ngOnDestroy() {
        if (this.staffFetchAll$) {
            this.staffFetchAll$.unsubscribe();
        }

        if (this.listClientsForStaff$) {
            this.listClientsForStaff$.unsubscribe();
        }
    }
}