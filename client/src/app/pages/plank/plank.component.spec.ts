import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlankComponent } from './plank.component';

xdescribe('PlankComponent', () => {
  let component: PlankComponent;
  let fixture: ComponentFixture<PlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
