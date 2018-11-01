import { Injectable } from '@angular/core';
import { BehaviorSubject, bindNodeCallback } from 'rxjs';
import * as auth0 from 'auth0-js';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  // @TODO: Update environment variables and remove .example
  // extension in src/environments/environment.ts.example
  private Auth0 = new auth0.WebAuth({
    clientID: environment.auth.CLIENT_ID,
    domain: environment.auth.CLIENT_DOMAIN,
    responseType: 'id_token token',
    redirectUri: environment.auth.REDIRECT,
    audience: environment.auth.AUDIENCE,
    scope: 'openid profile email'
  });
  // Track whether or not to renew token
  private authFlag = 'isLoggedIn';
  // Create stream for token
  token$ = new BehaviorSubject<string>(null);
  // Create stream for user profile data
  userProfile$ = new BehaviorSubject<any>(null);
  // Authentication navigation
  onAuthSuccessUrl = '/';
  onAuthFailureUrl = '/';
  logoutUrl = environment.auth.LOGOUT_URL;
  // Create observable of Auth0 parseHash method to gather auth results
  parseHash$ = bindNodeCallback(this.Auth0.parseHash.bind(this.Auth0));
  // Create observable of Auth0 checkSession method to
  // verify authorization server session and renew tokens
  checkSession$ = bindNodeCallback(this.Auth0.checkSession.bind(this.Auth0));

  constructor(private router: Router) { }

  login() {
    this.Auth0.authorize();
  }

  handleLoginCallback() {
    if (window.location.hash && !this.isAuthenticated) {
      this.parseHash$().subscribe(
        authResult => {
          this.localLogin(authResult);
          this.router.navigate([this.onAuthSuccessUrl]);
        },
        err => this.handleError(err)
      )
    }
  }

  private localLogin(authResult) {
    // Observable of token
    this.token$.next(authResult.accessToken);
    // Emit value for user data subject
    this.userProfile$.next(authResult.idTokenPayload);
    // Set flag in local storage stating this app is logged in
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  }

  get isAuthenticated(): boolean {
    return JSON.parse(localStorage.getItem(this.authFlag));
  }

  renewAuth() {
    if (this.isAuthenticated) {
      this.checkSession$({}).subscribe(
        authResult => this.localLogin(authResult),
        err => {
          localStorage.removeItem(this.authFlag);
          this.router.navigate([this.onAuthFailureUrl]);
        }
      );
    }
  }

  private localLogout() {
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    this.token$.next(null);
    this.userProfile$.next(null);
  }

  logout() {
    this.localLogout();
    // This does a refresh and redirects back to homepage
    // Make sure you have the logout URL in your Auth0
    // Dashboard Application settings in Allowed Logout URLs
    this.Auth0.logout({
      returnTo: this.logoutUrl,
      clientID: environment.auth.CLIENT_ID
    });
  }

  private handleError(err) {
    if (err.error_description) {
      console.error(`Error: ${err.error_description}`);
    } else {
      console.error(`Error: ${JSON.stringify(err)}`);
    }
  }

}
