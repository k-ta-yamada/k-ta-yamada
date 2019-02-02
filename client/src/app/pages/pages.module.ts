import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ProfComponent } from './prof/prof.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [IndexComponent, ProfComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PagesModule { }
