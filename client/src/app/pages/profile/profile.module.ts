import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileBioComponent } from './profile-bio/profile-bio.component';
import { ProfileSkillComponent } from './profile-skill/profile-skill.component';
import { RouterModule } from '@angular/router';
import { LibsModule } from 'src/app/libs/libs.module';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileBioComponent,
    ProfileSkillComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LibsModule,
  ]
})
export class ProfileModule { }
