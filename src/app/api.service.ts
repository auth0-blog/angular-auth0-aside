import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private baseUrl = 'http://localhost:3001/api/';

  constructor(private http: HttpClient) { }

  getDragons$(): Observable<any[]> {
    return this.http
      .get(`${this.baseUrl}dragons`, {
        headers: new HttpHeaders().set(
          'Authorization', `Bearer ${localStorage.getItem('access_token')}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Unable to retrieve data';
    return Observable.throw(errorMsg);
  }

}

