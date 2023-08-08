import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegionData } from '../models/region';

@Injectable()
export class DpaService {
  private apiUrl =
    'https://gist.githubusercontent.com/juanbrujo/0fd2f4d126b3ce5a95a7dd1f28b3d8dd/raw/b8575eb82dce974fd2647f46819a7568278396bd/comunas-regiones.json';

  constructor(private http: HttpClient) {}

  getRegionData(): Observable<RegionData> {
    return this.http.get<RegionData>(this.apiUrl);
  }
}
