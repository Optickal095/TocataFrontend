import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable()
export class UserService {
  public url: string;
  public identity: any;
  public token: string | null;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
    this.token = null; // Inicializar token como null
  }

  register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'register', params, {
      headers: headers,
    });
  }

  singup(user: User, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user = Object.assign(user, { gettoken });
    }

    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'auth/login', params, {
      headers: headers,
    });
  }

  getIdentity() {
    let identity = localStorage.getItem('user');

    if (identity !== null && identity !== 'undefined') {
      this.identity = JSON.parse(identity);
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('accessToken');

    if (token !== null && token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }
}
