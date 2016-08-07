import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Staff, Address } from '../../../model/model';
import { StaffService } from '../staff.service';
import { PaginationComponent } from '../../../pagination/pagination.component';
import { Unspecified } from '../../../common/pipes/unspecified.pipe';
import { ArrayDelimiter } from '../../../common/pipes/array-delimiter';
import { GeneralAvailabilityPipe } from '../../../common/pipes/general-availability.pipe';
import { FootCasePipe } from '../../../common/pipes/foot-case.ts'

@Component({
    selector: 'em-staff-list',
    templateUrl: './staff-list.component.html',
    directives: [PaginationComponent],
    pipes: [Unspecified, ArrayDelimiter, GeneralAvailabilityPipe, FootCasePipe],
    providers: [StaffService]
})
export class StaffListComponent implements OnInit, OnDestroy {

    staffList: Staff[] = [];
    errorMessage: string;

    private staffFetchAll$: Subscription;
    private listClientsForStaff$: Subscription;

    constructor(private staffService: StaffService) { }

    ngOnInit() {
        this.staffFetchAll$ = this.staffService.findAll()
            .subscribe(staffList => {
                this.staffList = staffList.map(staff => {
                    return staff;
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

        if (this.listClientsForStaff$) { }
    }

    listClients(staff: Staff) {
        this.staffService.listClientsByStaff(staff).subscribe(res => {
            console.log(res);
        }, err => {
            console.log(err);
        });
    }
}