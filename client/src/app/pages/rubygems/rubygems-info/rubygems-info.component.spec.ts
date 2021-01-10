import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RubygemsInfoComponent } from './rubygems-info.component';
import { GemInfo } from 'src/app/services/rubygems.service';

describe('RubygemsInfoComponent', () => {
  let component: RubygemsInfoComponent;
  let fixture: ComponentFixture<RubygemsInfoComponent>;

  beforeEach(waitForAsync(() => {
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
