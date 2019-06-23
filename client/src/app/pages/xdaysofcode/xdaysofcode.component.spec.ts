import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XdaysofcodeComponent } from './xdaysofcode.component';
import { XdaysofcodeService } from 'src/app/services/xdaysofcode.service';
import { of } from 'rxjs';

describe('XdaysofcodeComponent', () => {
  let component: XdaysofcodeComponent;
  let fixture: ComponentFixture<XdaysofcodeComponent>;
  let xdaysofcodeService: XdaysofcodeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XdaysofcodeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XdaysofcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    xdaysofcodeService = TestBed.get(XdaysofcodeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should behave...', () => {
      const dummy_result = 'dummy_result';
      spyOn(xdaysofcodeService, 'get').and.returnValue(of(dummy_result));
      component.ngOnInit();
      expect(component.html['changingThisBreaksApplicationSecurity']).toBe(dummy_result);
    });
  });
});
