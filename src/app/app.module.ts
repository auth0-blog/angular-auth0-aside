import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {ApiService} from './api.service';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {CallbackComponent} from './callback/callback.component';
import {ProfileComponent} from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
