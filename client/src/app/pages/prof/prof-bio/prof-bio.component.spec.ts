import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfBioComponent } from './prof-bio.component';

describe('ProfBioComponent', () => {
  let component: ProfBioComponent;
  let fixture: ComponentFixture<ProfBioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfBioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
