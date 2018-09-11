import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { environment } from './../environments/environment';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getDragons$(accessToken: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.auth.AUDIENCE}dragons`, {
        headers: new HttpHeaders().set(
          'Authorization', `Bearer ${accessToken}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Unable to retrieve data';
    return throwError(errorMsg);
  }

}
