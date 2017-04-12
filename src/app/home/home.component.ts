import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../api.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  dragons: any[];
  authSubscription: Subscription;
  dragonsSubscription: Subscription;

  constructor(private api: ApiService, public auth: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.auth.loggedIn$.subscribe(auth => {
      if (auth) {
        this._getDragons();
      } else {
        this.dragons = null;
        this._destroyDragonsSubscription();
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this._destroyDragonsSubscription();
  }

  private _getDragons() {
    this.dragonsSubscription = this.api.getDragons$().subscribe(
      data => {
        this.dragons = data;
      },
      err => console.warn(err),
      () => console.info('Request complete')
    );
  }

  private _destroyDragonsSubscription() {
    if (this.dragonsSubscription) {
      this.dragonsSubscription.unsubscribe();
    }
  }

}
