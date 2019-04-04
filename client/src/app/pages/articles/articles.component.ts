import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = [];

  constructor(private service: ArticleService) { }

  ngOnInit() {
    this.service.get().subscribe(
      (articles) => { this.articles = articles; },
      (error) => { console.error(error); },
    );
  }

  zeroPadding(target: number, count: number): string {
    return ('0'.repeat(count.toString().length) + target).slice(-(count.toString().length));
  }

}
