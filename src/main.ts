declare var process: any;
declare var require: any;

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (process.env.ENV === 'production') {
    enableProdMode();
}

require('../less/style.less');

platformBrowserDynamic().bootstrapModule(AppModule);