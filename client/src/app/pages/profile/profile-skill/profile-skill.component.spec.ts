import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSkillComponent } from './profile-skill.component';

describe('ProfileSkillComponent', () => {
  let component: ProfileSkillComponent;
  let fixture: ComponentFixture<ProfileSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
