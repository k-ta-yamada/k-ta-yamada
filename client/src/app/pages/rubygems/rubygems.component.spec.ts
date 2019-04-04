import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubygemsComponent } from './rubygems.component';
import { RubygemsModule } from './rubygems.module';
import { RubygemsService, GemInfo } from 'src/app/services/rubygems.service';
import { of, throwError } from 'rxjs';

describe('RubygemsComponent', () => {
  let component: RubygemsComponent;
  let fixture: ComponentFixture<RubygemsComponent>;
  let rubygemsService: RubygemsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RubygemsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubygemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    rubygemsService = TestBed.get(RubygemsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('success', () => {
      const dummy_result = [
        {name: 'dummy 1' } as GemInfo,
        {name: 'dummy 2' } as GemInfo,
      ];
      spyOn(rubygemsService, 'get').and.returnValue(of(dummy_result));
      expect(component.gems).toBeUndefined();
      component.ngOnInit();
      expect(rubygemsService.get).toHaveBeenCalled();
      expect(component.gems).toBe(dummy_result);
    });

    it('error', () => {
      spyOn(rubygemsService, 'get').and.returnValue(throwError('error'));
      spyOn(console, 'error');
      expect(component.gems).toBeUndefined();
      component.ngOnInit();
      expect(rubygemsService.get).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('error');
      expect(component.gems).toBeUndefined();
    });
  });
});
