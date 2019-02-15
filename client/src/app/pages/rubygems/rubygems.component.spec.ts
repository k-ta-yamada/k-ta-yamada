import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubygemsComponent } from './rubygems.component';

xdescribe('RubygemsComponent', () => {
  let component: RubygemsComponent;
  let fixture: ComponentFixture<RubygemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubygemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubygemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
