import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './../../api.service';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dragons$ = this.api.getDragons$();
  user$ = this.auth.userProfile$.pipe(catchError(err => throwError(err)));

  constructor(
    private api: ApiService,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

}
