import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubygemsInfoComponent } from './rubygems-info.component';

xdescribe('RubygemsInfoComponent', () => {
  let component: RubygemsInfoComponent;
  let fixture: ComponentFixture<RubygemsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubygemsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubygemsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
