import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlankComponent } from './plank.component';
import { PlankService, Plank } from 'src/app/services/plank.service';
import { of, throwError } from 'rxjs';

describe('PlankComponent', () => {
  let component: PlankComponent;
  let fixture: ComponentFixture<PlankComponent>;
  let plankService: PlankService;

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

    plankService = TestBed.inject(PlankService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOninit', () => {
    it('success', () => {
      const dummy_result = [
        { day: '1' } as Plank,
        { day: '2' } as Plank,
      ];
      spyOn(plankService, 'get').and.returnValue(of(dummy_result));
      expect(component.record).toBeUndefined();
      component.ngOnInit();
      expect(plankService.get).toHaveBeenCalled();
      expect(component.record).toBe(dummy_result);
    });

    it('error', () => {
      spyOn(plankService, 'get').and.returnValue(throwError('error'));
      spyOn(console, 'error');
      expect(component.record).toBeUndefined();
      component.ngOnInit();
      expect(plankService.get).toHaveBeenCalled();
      // TODO
      expect(console.error).toHaveBeenCalled();
      expect(component.record).toBeUndefined();
    });
  });
});
