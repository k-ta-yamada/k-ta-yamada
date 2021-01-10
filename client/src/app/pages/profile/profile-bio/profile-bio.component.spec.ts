import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileBioComponent } from './profile-bio.component';

describe('ProfileBioComponent', () => {
  let component: ProfileBioComponent;
  let fixture: ComponentFixture<ProfileBioComponent>;

  beforeEach(waitForAsync(() => {
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
