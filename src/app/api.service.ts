import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
  private baseUrl = 'http://localhost:3001/api/';

  constructor(private http: Http, private authHttp: AuthHttp, private options: RequestOptions) { }

  getDragons$(): Observable<string> {
    return this.authHttp
      .get(`${this.baseUrl}dragons`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  private _handleSuccess(res: Response) {
    return res.json();
  }

  private _handleError(err: Response | any) {
    const errorMsg = err.message || 'Unable to retrieve data';
    return Observable.throw(errorMsg);
  }

}

