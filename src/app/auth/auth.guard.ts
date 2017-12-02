import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {isAuthenticated} from 'auth0-web';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {
    if (isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
