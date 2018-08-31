import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './../api.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  dragons: any[];
  authSub: Subscription;
  profileSub: Subscription;
  dragonsSub: Subscription;
  user: any;

  constructor(
    private api: ApiService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    // Subscribe to tokenData$ subject
    this.authSub = this.auth.tokenData$.subscribe(
      tokenData => {
        if (tokenData.accessToken) {
          // If authenticated, get dragon data
          this._getDragons(tokenData.accessToken);
        } else {
          this.dragons = null;
        }
      },
      err => console.log(err)
    );
    // Subscribe to userProfile$ subject
    this.profileSub = this.auth.userProfile$.subscribe(
      profile => this.user = profile ? profile : null,
      err => console.log(err)
    );
  }

  private _getDragons(accessToken: string) {
    // Subscribe to dragons API observable
    this.dragonsSub = this.api.getDragons$(accessToken).subscribe(
      data => {
        this.dragons = data;
      },
      err => console.log(err)
    );
  }

  private _destroyDragonsSub() {
    // If a dragons subscription exists, unsubscribe
    if (this.dragonsSub) {
      this.dragonsSub.unsubscribe();
    }
  }

  get dragonsExist() {
    return !!this.dragons && this.dragons.length;
  }

  ngOnDestroy() {
    // Unsubscribe from observables
    this.authSub.unsubscribe();
    this.profileSub.unsubscribe();
    this._destroyDragonsSub();
  }

}
