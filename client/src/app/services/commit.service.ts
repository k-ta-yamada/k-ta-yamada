import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as humps from 'humps';

@Injectable({
  providedIn: 'root'
})
export class CommitService {

  url = 'api/commit';

  constructor(private http: HttpClient) { }

  getBrancheNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/branches`);
  }

  getBranche(branche: string): Observable<Branch[]> {
    const params = { branche };
    const mapper = map((response: []) => response.map(obj => humps.camelizeKeys(obj) as Branch));
    return this.http
      .get<any[]>(`${this.url}/commits`, { params })
      .pipe(mapper);
  }
}

export interface Branch {
  sha: string;
  commitMessage: string;
  commitAuthorDate: string;
  commitAuthorName: string;
  htmlUrl: string;
}
