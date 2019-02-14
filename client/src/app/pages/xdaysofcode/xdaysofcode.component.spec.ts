import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XdaysofcodeComponent } from './xdaysofcode.component';

xdescribe('XdaysofcodeComponent', () => {
  let component: XdaysofcodeComponent;
  let fixture: ComponentFixture<XdaysofcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XdaysofcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XdaysofcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
