import {Component} from '@angular/core';
import {configure, handleAuthCallback} from 'auth0-web';
import {AUTH_CONFIG} from './auth0-variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    // configure Auth0 client
    const auth0Config = {
      clientID: AUTH_CONFIG.CLIENT_ID,
      domain: AUTH_CONFIG.CLIENT_DOMAIN,
      redirectUri: AUTH_CONFIG.REDIRECT,
      audience: AUTH_CONFIG.AUDIENCE,
      scope: AUTH_CONFIG.SCOPE
    };
    configure(auth0Config);
    // check if there are tokens in the hash
    handleAuthCallback();
  }
}
