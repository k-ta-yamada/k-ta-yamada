import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ClickOutsideModule } from 'ng-click-outside';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ClickOutsideModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickOutside', () => {
    it('should behave...', () => {
      component.onClickOutside();
      fixture.detectChanges();

      // TODO: Do meaningful tests
      expect().nothing();
    });
  });
});
