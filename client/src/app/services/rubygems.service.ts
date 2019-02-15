import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubygemsService {

  url = 'api/rubygems';

  constructor(private http: HttpClient) { }

  get(): Observable<GemInfo[]> {
    return this.http.get<GemInfo[]>(this.url);
  }

  getVersions(gemname: string): Observable<GemVersion[]> {
    return this.http.get<GemVersion[]>(`${this.url}/${gemname}`);
  }
}

export interface GemInfo {
  name: string;
  info: string;
  project_uri: string;
  source_code_uri: string;
  documentation_uri: string;
  version: number;
  version_downloads: number;
  downloads: number;
}

export interface GemVersion {
  number: string;
  downloads_count: number;
}
