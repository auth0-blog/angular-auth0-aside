import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any;
  profileArray: any[];
  profileSub: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.profileSub = this.auth.userProfile$.subscribe(
      profile => {
        this.user = profile;
        this.profileArray = this._makeProfileArray(profile);
      },
      err => console.log(err)
    );
  }

  private _makeProfileArray(obj) {
    const keyPropArray = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        keyPropArray.push(key + ': ' + JSON.stringify(obj[key]));
      }
    }
    return keyPropArray;
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe();
  }

}
