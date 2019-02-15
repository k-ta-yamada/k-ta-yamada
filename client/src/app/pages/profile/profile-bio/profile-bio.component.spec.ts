import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBioComponent } from './profile-bio.component';

describe('ProfileBioComponent', () => {
  let component: ProfileBioComponent;
  let fixture: ComponentFixture<ProfileBioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
