import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'em-footer',
    templateUrl: './footer.component.html',
    styles:  [String(require('./footer.component.less'))]
})
export class FooterComponent implements OnInit {

    today: any;

    ngOnInit() {
        this.today = new Date().getFullYear();
    }

}