import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService, public auth: AuthService) { }

  ngOnInit() {
  }

}
