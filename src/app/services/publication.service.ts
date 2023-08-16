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

  addPublication(
    token: string,
    publication: Publication,
    file: File
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('text', publication.text);
    formData.append('file', file);

    const headers = new HttpHeaders().set('Authorization', token);

    return this._http.post(this.url + 'publication', formData, {
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

  getPublicationsUser(
    token: string,
    user_id: string,
    page = 1
  ): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(
      this.url + 'publications-user/' + user_id + '/' + page,
      {
        headers: headers,
      }
    );
  }

  deletePublication(token: string, id: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.delete(this.url + 'publication/' + id, {
      headers: headers,
    });
  }

  getAllPublications(token: string, page = 1): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'allpublications/' + page, {
      headers: headers,
    });
  }
}
