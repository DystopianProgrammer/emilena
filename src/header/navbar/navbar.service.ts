import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavBarService {

    private toggleNavBarSource = new Subject<boolean>();

    toggleNavBar$ = this.toggleNavBarSource.asObservable();

    toggleNavBar(toggle: boolean) {
        this.toggleNavBarSource.next(toggle);
    }
}