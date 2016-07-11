declare var process: any;
declare var require: any;

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';

if (process.env.ENV === 'production') {
    enableProdMode();
}

require('../less/style.less');

bootstrap(AppComponent, [APP_ROUTER_PROVIDERS]).catch(err => console.log(err));
