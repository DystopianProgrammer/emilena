import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'em-badge',
    templateUrl: './badge.component.html'
})
export class BadgeComponent {

    @Output() dismissBadge = new EventEmitter<boolean>();

    dismiss(dismissed: boolean) {
        this.dismissBadge.emit(dismissed);
    }
}