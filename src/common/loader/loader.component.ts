import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { LoaderService } from './loader.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'em-loader',
    template: `
                <div [ngClass]="{ 'loader': !hasLoaded }">
                    <div class="inner-loader">
                        <ng-content></ng-content>
                    <div>
                </div>
             `
})
export class LoaderComponent implements OnDestroy, OnInit {

    private hasLoaded: boolean;
    private loaderSubscriber: Subscription;

    constructor(private loaderService: LoaderService) {
        this.loaderSubscriber =
            this.loaderService.hasLoaded$().subscribe(loaded => this.hasLoaded = loaded);
    }

    ngOnInit() {
        this.hasLoaded = true;
    }

    ngOnDestroy() {
        this.loaderSubscriber.unsubscribe();
    }
}