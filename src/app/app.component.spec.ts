import { inject, addProviders } from '@angular/core/testing';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthenticationService } from '../authentication/authentication.service';

describe('App', () => {

    beforeEach(() => {
        addProviders([AppComponent, AuthenticationService, HTTP_PROVIDERS]);
    });

    it('should work', inject([AppComponent], (app: AppComponent) => {
        expect(2).toBe(2);
    }));
});
