import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebAuth } from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import { UserProfile } from './profile.model';

(window as any).global = window;

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  // @TODO: Update AUTH_CONFIG and remove .example extension in src/app/auth/auth0-variables.ts.example
  private _auth0: WebAuth = new WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  });
  userProfile: UserProfile;
  accessToken: string;

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor() {
    // You can restore an unexpired authentication session on init
    // by using the checkSession() endpoint from auth0.js:
    // https://auth0.com/docs/libraries/auth0js/v9#using-checksession-to-acquire-new-tokens
  }

  private _setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login() {
    // Auth0 authorize request
    this._auth0.authorize();
  }

  handleLoginCallback() {
    // When Auth0 hash parsed, get profile
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
    });
  }

  getUserInfo(authResult) {
    // Use access token to retrieve user's profile and set session
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      this._setSession(authResult, profile);
    });
  }

  private _setSession(authResult, profile) {
    const expTime = authResult.expiresIn * 1000 + Date.now();
    // Save session data and update login status subject
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    this.accessToken = authResult.accessToken;
    this.userProfile = profile;
    this._setLoggedIn(true);
  }

  logout() {
    // Remove token and profile and update login status subject
    localStorage.removeItem('expires_at');
    this.accessToken = undefined;
    this.userProfile = undefined;
    this._setLoggedIn(false);
  }

  get authenticated(): boolean {
    // Check if current date is greater than expiration
    // and user is currently logged in
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return (Date.now() < expiresAt) && this.loggedIn;
  }

}
