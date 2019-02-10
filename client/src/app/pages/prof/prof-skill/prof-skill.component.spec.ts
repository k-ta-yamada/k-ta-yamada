import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfSkillComponent } from './prof-skill.component';

describe('ProfSkillComponent', () => {
  let component: ProfSkillComponent;
  let fixture: ComponentFixture<ProfSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
