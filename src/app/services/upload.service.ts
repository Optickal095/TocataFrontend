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

  makeFileRequest(
    url: string,
    params: Array<string>,
    files: Array<File>,
    token: string,
    name: string
  ) {
    return new Promise(function (resolve, reject) {
      let formData: any = new FormData();
      let xhr = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }

  uploadFile(
    url: string,
    files: Array<File>,
    token: string,
    name: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData: FormData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name);
      }

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
}
