import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'em-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

    today: any;

    ngOnInit() {
        this.today = new Date().getFullYear();
    }

}