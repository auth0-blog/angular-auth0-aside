import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$: Observable<any> = this.auth.userProfile$;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  makeProfileArray(obj): string[] {
    const keyPropArray = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        keyPropArray.push(key + ': ' + JSON.stringify(obj[key]));
      }
    }
    return keyPropArray;
  }

}
