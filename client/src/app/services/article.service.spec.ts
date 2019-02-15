import { TestBed } from '@angular/core/testing';

import { ArticleService } from './article.service';

xdescribe('ArticleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleService = TestBed.get(ArticleService);
    expect(service).toBeTruthy();
  });
});
