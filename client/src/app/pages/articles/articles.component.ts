import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('api/articles').subscribe(r => {
      this.articles = r;
      console.log(r);
    });
  }

  zeroPadding(i: number, c: number): string {
    return ('0'.repeat(c.toString().length) + i).slice(-(c.toString().length));
  }

}
