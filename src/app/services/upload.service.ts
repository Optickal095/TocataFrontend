import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UploadService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  uploadImage(userId: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer your_auth_token'
    );

    return this.http.post(`${this.url}/user/${userId}/upload-image`, formData, {
      headers,
    });
  }
}
