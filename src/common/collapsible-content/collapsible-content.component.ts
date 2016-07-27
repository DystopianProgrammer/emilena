import { Component, Input } from '@angular/core';

/**
 * Essentially a similar vein to an accordion. The input of title reflects the heading in the panel.
 */
@Component({
    selector: 'em-collapsible-content',
    templateUrl: './collapsible-content.component.html'
})
export class CollapsibleContentComponent {

    @Input() title: any;
    @Input() isCollapsed: any;

    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }
}