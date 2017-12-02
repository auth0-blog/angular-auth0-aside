import {Component, OnInit} from '@angular/core';
import {getProfile} from 'auth0-web';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileArray = this._makeProfileArray(getProfile());

  constructor() {
  }

  ngOnInit() {
    console.log(getProfile());
  }

  private _makeProfileArray(obj) {
    const keyPropArray = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        keyPropArray.push(key + ': ' + obj[key]);
      }
    }

    return keyPropArray;
  }

}
