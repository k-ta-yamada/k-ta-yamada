import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IndexMenuComponent } from './index-menu.component';

describe('IndexMenuComponent', () => {
  let component: IndexMenuComponent;
  let fixture: ComponentFixture<IndexMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
