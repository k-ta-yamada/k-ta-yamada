import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IndexMessageComponent } from './index-message.component';

describe('IndexMessageComponent', () => {
  let component: IndexMessageComponent;
  let fixture: ComponentFixture<IndexMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
