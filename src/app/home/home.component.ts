import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ApiService} from '../api.service';
import * as Auth0Client from 'auth0-web';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  dragons: any[];
  authSubscription: { unsubscribe: () => void };
  dragonsSubscription: Subscription;
  auth = Auth0Client;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    // Subscribe to login status subject
    // If authenticated, subscribe to dragons data observable
    // If not authenticated, unsubscribe from dragons data
    this.authSubscription = Auth0Client.subscribe(loggedIn => {
      if (loggedIn) {
        this._getDragons();
      } else {
        this.dragons = null;
        this._destroyDragonsSubscription();
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe from observables
    this.authSubscription.unsubscribe();
    this._destroyDragonsSubscription();
  }

  private _getDragons() {
    // Subscribe to dragons API observable
    this.dragonsSubscription = this.api.getDragons$().subscribe(
      data => {
        this.dragons = data;
      },
      err => console.warn(err),
      () => console.log('Request complete')
    );
  }

  private _destroyDragonsSubscription() {
    // If a dragons subscription exists, unsubscribe
    if (this.dragonsSubscription) {
      this.dragonsSubscription.unsubscribe();
    }
  }

  get dragonsExist() {
    return !!this.dragons && this.dragons.length;
  }

}
