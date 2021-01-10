import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileSkillComponent } from './profile-skill.component';

describe('ProfileSkillComponent', () => {
  let component: ProfileSkillComponent;
  let fixture: ComponentFixture<ProfileSkillComponent>;

  beforeEach(waitForAsync(() => {
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
