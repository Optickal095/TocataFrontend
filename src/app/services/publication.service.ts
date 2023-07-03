import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Publication } from '../models/publication';

@Injectable()
export class PublicationService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addPublication(token: string, publication: Publication): Observable<any> {
    const params = JSON.stringify(publication);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.post(this.url + 'publication', params, {
      headers: headers,
    });
  }

  getPublications(token: string, page = 1): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'publications/' + page, {
      headers: headers,
    });
  }

  deletePublication(token: string, id: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.delete(this.url + 'publications/' + id, {
      headers: headers,
    });
  }
}
