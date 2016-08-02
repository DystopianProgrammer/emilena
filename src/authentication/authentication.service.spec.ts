import { inject, addProviders } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HTTP_PROVIDERS } from '@angular/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../model/model';

describe('The security of authentication service', () => {

    beforeEach(() => {
        addProviders([AuthenticationService, HTTP_PROVIDERS, MockBackend]);
    });

    it('should authenticate user - login()', inject([AuthenticationService], (service: AuthenticationService) => {

        // given
        let user = new User();
        // when
        let observable = service.authenticate(user);
        // then
        expect(observable).toBeDefined();
    }));
});

