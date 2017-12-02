import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {stringify} from 'querystring';
import * as Auth0Web from 'auth0-web';
import {AUTH_CONFIG} from './auth0-variables';

@Injectable()
export class AuthService {
  auth0Config = {
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  };

  handleAuth = Auth0Web.handleAuthCallback;
  login = Auth0Web.signIn;
  logout = Auth0Web.signOut;
  authenticated = Auth0Web.isAuthenticated;
  subscribe = Auth0Web.subscribe;
  userProfile = Auth0Web.getProfile;

  constructor(@Inject(DOCUMENT) private document: any) {
    Auth0Web.configure(this.auth0Config);
    const auth = Auth0Web.isAuthenticated();
  }
}
