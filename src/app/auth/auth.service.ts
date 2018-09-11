import { Injectable } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs';
import * as auth0 from 'auth0-js';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { TokenData } from './tokendata.model';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  // @TODO: Update environment variables and remove .example
  // extension in src/environments/environment.ts.example
  private _Auth0 = new auth0.WebAuth({
    clientID: environment.auth.CLIENT_ID,
    domain: environment.auth.CLIENT_DOMAIN,
    responseType: 'id_token token',
    redirectUri: environment.auth.REDIRECT,
    audience: environment.auth.AUDIENCE,
    scope: 'openid profile email'
  });
  // Track whether or not to renew token
  private _authFlag = 'isLoggedIn';
  // Create streams for authentication data
  tokenData$ = new AsyncSubject<TokenData>();
  userProfile$ = new AsyncSubject<any>();
  // Authentication navigation
  onAuthSuccessUrl = '/';
  onAuthFailureUrl = '/';
  logoutUrl = environment.auth.LOGOUT_URL;

  // Create observable of Auth0 parseHash method to gather auth results
  parseHash$ = Observable.create(observer => {
    this._Auth0.parseHash((err, authResult) => {
      if (err) {
        observer.error(err);
      } else if (authResult && authResult.accessToken) {
        observer.next(authResult);
      }
      observer.complete();
    });
  });

  // Create observable of Auth0 checkSession method to
  // verify authorization server session and renew tokens
  checkSession$ = Observable.create(observer => {
    this._Auth0.checkSession({}, (err, authResult) => {
      if (err) {
        observer.error(err);
      } else if (authResult && authResult.accessToken) {
        observer.next(authResult);
      }
      observer.complete();
    });
  });

  constructor(private router: Router) { }

  login() {
    this._Auth0.authorize();
  }

  handleLoginCallback() {
    if (window.location.hash && !this.authenticated) {
      this.parseHash$.subscribe(
        authResult => {
          this._setAuth(authResult);
          window.location.hash = '';
          this.router.navigate([this.onAuthSuccessUrl]);
        },
        err => this._handleError(err)
      )
    }
  }

  private _setAuth(authResult) {
    // Emit value for tokenData$ async subject and complete
    this.tokenData$.next({
      expiresAt: authResult.expiresIn * 1000 + Date.now(),
      accessToken: authResult.accessToken
    });
    this.tokenData$.complete();
    // Emit value for userProfile$ async subject and complete
    this.userProfile$.next(authResult.idTokenPayload);
    this.userProfile$.complete();
    // Set flag in local storage stating this app is logged in
    localStorage.setItem(this._authFlag, JSON.stringify(true));
  }

  get authenticated(): boolean {
    return JSON.parse(localStorage.getItem(this._authFlag));
  }

  renewAuth() {
    if (this.authenticated) {
      this.checkSession$.subscribe(
        authResult => this._setAuth(authResult),
        err => {
          localStorage.removeItem(this._authFlag);
          this.router.navigate([this.onAuthFailureUrl]);
        }
      );
    }
  }

  logout() {
    // Set authentication status flag in local storage to false
    localStorage.setItem(this._authFlag, JSON.stringify(false));
    // This does a refresh and redirects back to homepage
    // Make sure you have the logout URL in your Auth0
    // Dashboard Application settings in Allowed Logout URLs
    this._Auth0.logout({
      returnTo: this.logoutUrl,
      clientID: environment.auth.CLIENT_ID
    });
  }

  private _handleError(err) {
    if (err.error_description) {
      console.error(`Error: ${err.error_description}`);
    } else {
      console.error(`Error: ${JSON.stringify(err)}`);
    }
  }

}
