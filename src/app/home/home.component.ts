import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dragons: any[];

  constructor(private api: ApiService, public auth: AuthService) { }

  ngOnInit() {
    this.getDragons();
  }

  getDragons() {
    this.api.getDragons$().subscribe(
      data => {
        this.dragons = data;
        console.log(data);
      },
      err => console.warn(err),
      () => console.info('Request complete')
    );
  }

}
