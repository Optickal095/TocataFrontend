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
  public stats: any;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
    this.token = null; // Inicializar token como null
  }

  register(user: User): Observable<any> {
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post<any>(this.url + 'register', params, { headers });
  }

  singup(user: User, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user = { ...user, gettoken } as User;
    }

    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post<any>(this.url + 'auth/login', params, { headers });
  }

  getIdentity() {
    const identityString = localStorage.getItem('user');
    this.identity = identityString ? JSON.parse(identityString) : null;
    return this.identity;
  }

  getToken() {
    const token = localStorage.getItem('accessToken');
    this.token = token || null;
    return this.token;
  }

  getStats() {
    const statsString = localStorage.getItem('stats');
    this.stats = statsString ? JSON.parse(statsString) : null;
    return this.stats;
  }

  getCounters(userId = null): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken() || '');

    let url =
      userId != null ? this.url + 'counters/' + userId : this.url + 'counters';

    return this._http.get<any>(url, { headers });
  }

  updateUser(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken() || '');

    return this._http.put(this.url + 'user/' + user._id, params, {
      headers: headers,
    });
  }
}
