import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommitService {

  url = 'api/commit';

  constructor(private http: HttpClient) { }

  getBranches(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/branches`);
  }

  getBranche(name: string): Observable<any[]> {
    const params = new HttpParams();
    params.append('branche', name);
    return this.http.get<any[]>(`${this.url}/commits`, { params });
  }
}
