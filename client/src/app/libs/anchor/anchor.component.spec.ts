import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnchorComponent } from './anchor.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { NgContentAst } from '@angular/compiler';

@Component({
  selector: 'app-dummy',
  template: `
    <app-anchor [href]="url" id="no-content"></app-anchor>
    <app-anchor [href]="url" id="with-content">{{ contents }}</app-anchor>
  `
})
class DummyComponent {
  url = 'https://k-ta-yamada.me';
  contents = 'contents';
}

describe('AComponent', () => {
  let component: AnchorComponent;
  let fixture: ComponentFixture<AnchorComponent>;
  let dummyFixture: ComponentFixture<DummyComponent>;

  let anchorEl: HTMLAnchorElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // declarations: [ AnchorComponent ]
      declarations: [ DummyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorComponent);
    dummyFixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    anchorEl = fixture.debugElement.query(By.css('a')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('href', () => {
    it('default', () => {
      expect(component.href).toBe('#');
      expect(anchorEl.href).toBe('http://localhost:9876/#');
    });

    it('set value', () => {
      expect(component.href).toBe('#');
      component.href = 'https://k-ta-yamada.me';
      fixture.detectChanges();
      expect(anchorEl.href).toBe('https://k-ta-yamada.me/');
    });
  });

  describe('target', () => {
    it('default', () => {
      expect(component.target).toBe('_blank');
      expect(anchorEl.target).toBe('_blank');
    });

    it('set value', () => {
      component.target = '_top';
      fixture.detectChanges();
      expect(component.target).toBe('_top');
      expect(anchorEl.target).toBe('_top');
    });
  });

  describe('rel', () => {
    it('default', () => {
      expect(component.rel).toBe('noopener');
    });

    it('set value', () => {
      expect(component.rel).toBe('noopener');
      component.target = '_top';
      fixture.detectChanges();
      expect(component.rel).toBe('');
    });
  });

  it('ng-content', () => {
    dummyFixture.detectChanges();

    const noContent = dummyFixture.debugElement.queryAll(By.css('#no-content > a'))
      .map(e => e.nativeElement as HTMLAnchorElement);
    const withContent = dummyFixture.debugElement.queryAll(By.css('#with-content > a'))
      .map(e => e.nativeElement as HTMLAnchorElement);

    expect(noContent.length).toBe(2);
    const noContentFirst = noContent[0];
    const noContentLast = noContent[noContent.length - 1];
    expect(noContentFirst.textContent.trim()).toBe('');
    expect(noContentLast.textContent.trim()).toBe(dummyFixture.componentInstance.url);

    expect(withContent.length).toBe(1);
    const withContentFirst = withContent[0];
    expect(withContentFirst.textContent.trim()).toBe(dummyFixture.componentInstance.contents);
  });
});
