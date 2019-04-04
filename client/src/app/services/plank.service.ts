import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as humps from 'humps';

@Injectable({
  providedIn: 'root'
})
export class PlankService {

  url = 'api/plank';

  constructor(private http: HttpClient) { }

  get(): Observable<Plank[]> {
    const mapper = map((response: []) =>
      response.map(obj => humps.camelizeKeys(obj) as Plank));
    return this.http.get<Plank[]>(this.url).pipe(mapper);
  }

}

export interface Plank {
  day: string;
  date: string;
  task: string;
  result: string;
  today: boolean;
  bgColor: string;
}
