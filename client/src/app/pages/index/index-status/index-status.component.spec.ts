import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexStatusComponent } from './index-status.component';

describe('IndexStatusComponent', () => {
  let component: IndexStatusComponent;
  let fixture: ComponentFixture<IndexStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
