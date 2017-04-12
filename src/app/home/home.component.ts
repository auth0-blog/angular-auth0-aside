import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../api.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  dragons: any[];
  authSubscription: Subscription;

  constructor(private api: ApiService, public auth: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.auth.loggedIn$.subscribe(auth => {
      if (auth) {
        this.getDragons();
      } else {
        this.dragons = null;
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  getDragons() {
    this.api.getDragons$().subscribe(
      data => {
        this.dragons = data;
      },
      err => console.warn(err),
      () => console.info('Request complete')
    );
  }

}
