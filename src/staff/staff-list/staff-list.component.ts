import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Staff, Address } from '../../model/model';
import { StaffService } from '../staff.service';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
    selector: 'em-staff-list',
    templateUrl: './staff-list.component.html',
    directives: [PaginationComponent],
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

        if(this.listClientsForStaff$) {}
    }

    listClients(staff: Staff) {
        this.staffService.listClientsByStaff(staff).subscribe(res => {
            console.log(res);
        }, err => {
            console.log(err);
        });
    }
}