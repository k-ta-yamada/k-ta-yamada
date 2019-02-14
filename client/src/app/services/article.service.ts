import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url = 'api/articles';

  constructor(private http: HttpClient) { }

  get(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url);
  }
}

export interface Article {
  title: string;
  url: string;
  tags: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
}
