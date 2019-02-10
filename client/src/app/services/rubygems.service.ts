import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubygemsService {

  url = 'api/rubygems.json';

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url);
  }
}

// TODO: create interface
export interface Xxx {
  xxx: string;
}
