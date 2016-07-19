import { Component, Input } from '@angular/core';


@Component({
    selector: 'em-validation',
    templateUrl: './validation.component.html'
})
export class ValidationComponent {

    errors: string[];

    @Input('error') set error(error: any) {
        this.errors = JSON.parse(error).errors;
    }
}