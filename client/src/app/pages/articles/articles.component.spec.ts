import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArticlesComponent } from './articles.component';
import { ArticleService, Article } from 'src/app/services/article.service';
import { of, throwError } from 'rxjs';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let articleService: ArticleService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    articleService = fixture.debugElement.injector.get(ArticleService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('success', () => {
      const dummy_result = [
        { title: 'article 1'} as Article,
        { title: 'article 2'} as Article,
      ];
      spyOn(articleService, 'get').and.returnValue(of(dummy_result));
      expect(component.articles).toEqual([]);
      component.ngOnInit();
      expect(articleService.get).toHaveBeenCalled();
      expect(component.articles).toEqual(dummy_result);
    });

    it('error', () => {
      spyOn(articleService, 'get').and.returnValue(throwError('error'));
      spyOn(console, 'error');
      expect(component.articles).toEqual([]);
      component.ngOnInit();
      expect(articleService.get).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('error');
      expect(component.articles).toEqual([]);
    });
  });

  describe('zeroPadding', () => {
    it('zero padding to the length of the argument `count`.', () => {
      const target = 1;
      const count = 10;
      expect(component.zeroPadding(target, count)).toBe('01');
    });
  });
});
