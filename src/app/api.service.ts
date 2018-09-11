import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  getDragons$(): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.auth.AUDIENCE}dragons`)
      .pipe(
        catchError(this._handleError)
      );
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Unable to retrieve data';
    return throwError(errorMsg);
  }

}
