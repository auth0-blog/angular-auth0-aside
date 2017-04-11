import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var localStorage: any;
declare var window: any;

@Injectable()
export class AuthService {
  CLIENT_DOMAIN = 'kmaida.auth0.com';
  CLIENT_ID = 'Rp1ZbPH6fK93lynaOt6HyQa3KcvN7Xl8&';
  AUDIENCE = 'http://localhost:3001/api/';
  REDIRECT_URI = 'http://localhost:4200';
  NONCE: string = this._randomString(16);

  authUrl = `https://${this.CLIENT_DOMAIN}/authorize?audience=${this.AUDIENCE}&
response_type=id_token%20token&client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&nonce=${this.NONCE}`;

  userProfile: Object;
  loginRedirect: string;

  constructor(private router: Router) {
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
  }

  logout() {
    // Remove token and profile
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  }

  get authenticated() {
    // Check if there's an unexpired access token
    return tokenNotExpired();
  }

  private _randomString(length) {
    var bytes = new Uint8Array(length);
    var random = window.crypto.getRandomValues(bytes);
    var result = [];
    var charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';

    random.forEach(function(c) {
        result.push(charset[c % charset.length]);
    });
    return result.join('');
  }

}
