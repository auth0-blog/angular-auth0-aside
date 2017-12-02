import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {subscribe} from 'auth0-web';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    subscribe(
      loggedIn => loggedIn ? this.router.navigate(['/']) : null
    )
  }

}
