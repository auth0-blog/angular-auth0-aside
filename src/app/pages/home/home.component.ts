import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './../../api.service';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  dragons: any[];
  profileSub: Subscription;
  dragonsSub: Subscription;
  user: any;

  constructor(
    private api: ApiService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this._getDragons();
    // Subscribe to userProfile$ subject
    this.profileSub = this.auth.userProfile$.subscribe(
      profile => this.user = profile ? profile : null,
      err => console.log(err)
    );
  }

  private _getDragons() {
    // Subscribe to dragons API observable
    this.dragonsSub = this.api.getDragons$().subscribe(
      data => {
        this.dragons = data;
      },
      err => console.log(err)
    );
  }

  get dragonsExist() {
    return !!this.dragons && this.dragons.length;
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe();
    this.dragonsSub.unsubscribe();
  }

}
