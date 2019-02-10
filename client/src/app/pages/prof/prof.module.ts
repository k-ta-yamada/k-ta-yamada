import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfComponent } from './prof.component';
import { ProfBioComponent } from './prof-bio/prof-bio.component';
import { ProfSkillComponent } from './prof-skill/prof-skill.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProfComponent,
    ProfBioComponent,
    ProfSkillComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class ProfModule { }
