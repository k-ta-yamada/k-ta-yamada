import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubygemsChartComponent } from './rubygems-chart.component';

describe('RubygemsChartComponent', () => {
  let component: RubygemsChartComponent;
  let fixture: ComponentFixture<RubygemsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubygemsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubygemsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
