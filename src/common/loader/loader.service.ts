import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoaderService {

    private loadingSource: Subject<boolean>;
    private _hasLoaded$: Observable<boolean>;

    constructor() {
        this.loadingSource = new Subject<boolean>();
        this._hasLoaded$ = this.loadingSource.asObservable();
    }

    hasLoaded$(): Observable<boolean> {
        return this._hasLoaded$;
    }

    notifyIsLoaded(loaded: boolean) {
        this.loadingSource.next(loaded);
    }
}