import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RubygemsChartComponent } from './rubygems-chart.component';
import { RubygemsService, GemVersion } from 'src/app/services/rubygems.service';
import { of, throwError } from 'rxjs';
import * as c3 from 'c3';

describe('RubygemsChartComponent', () => {
  let component: RubygemsChartComponent;
  let fixture: ComponentFixture<RubygemsChartComponent>;
  let rubygemsService: RubygemsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RubygemsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubygemsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    rubygemsService = TestBed.inject(RubygemsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('success', () => {
      const dummy_result = [
        {number: '1', downloads_count: 123 } as GemVersion,
        {number: '2', downloads_count: 456 } as GemVersion,
      ];
      spyOn(rubygemsService, 'getVersions').and.returnValue(of(dummy_result));
      spyOn(component, 'generateChart');
      component.ngOnInit();
      expect(rubygemsService.getVersions).toHaveBeenCalled();
      expect(component.generateChart).toHaveBeenCalledWith(dummy_result);
    });

    it('error', () => {
      spyOn(rubygemsService, 'getVersions').and.returnValue(throwError('error'));
      spyOn(component, 'generateChart');
      spyOn(console, 'error');
      component.ngOnInit();
      expect(rubygemsService.getVersions).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('error');
      expect(component.generateChart).not.toHaveBeenCalled();
    });
  });

  describe('generateChart', () => {
    it('should behave...', () => {
      spyOn(c3, 'generate');
      component.generateChart([]);
      expect(c3.generate).toHaveBeenCalled();
    });
  });
});
