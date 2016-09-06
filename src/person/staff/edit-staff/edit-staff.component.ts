import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Staff, Address, Availability, GeneralAvailability } from '../../../model/model';
import { StaffService } from '../staff.service';
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

@Component({
    selector: 'em-edit-staff',
    templateUrl: './edit-staff.component.html',
    directives: [PersonComponent,
        AddressComponent,
        ValidationComponent,
        AvailabilityComponent,
        CollapsibleContentComponent,
        BadgeComponent],
    pipes: [GeneralAvailabilityPipe, ArrayDelimiter],
    providers: [StaffService]
})
export class EditStaffComponent extends CommonActions implements OnInit, OnDestroy {

    contractTypes: string[] = ['CONTRACT', 'BANK'];
    staffTypes: string[] = ['SENIOR', 'SUPPORT'];

    private subStaffService: any;
    private subRoute: any;

    constructor(private staffService: StaffService,
        private route: ActivatedRoute,
        private router: Router) {

        super(new Staff());
    }

    ngOnInit() {
        this.subRoute = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.subStaffService = this.staffService.findById(id).subscribe(staff => {
                super.setPerson(staff);
            }, error => console.error(error));
        });
    }

    ngOnDestroy() {
        this.subRoute.unsubscribe();
        this.subStaffService.unsubscribe();
    }

    update(staff: Staff) {
        this.subStaffService = this.staffService.update(staff)
            .subscribe(res => {
                this.router.navigate(['/staff']);
            }, error => console.error(error));
    }
}