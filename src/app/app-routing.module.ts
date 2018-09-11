import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './auth/token.interceptor';

import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'callback',
        component: CallbackComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [
          AuthGuard
        ]
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
