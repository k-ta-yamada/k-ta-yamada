import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ProfComponent } from './prof/prof.component';
import { RouterModule } from '@angular/router';
import { RubygemsComponent } from './rubygems/rubygems.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [IndexComponent, ProfComponent, RubygemsComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ]
})
export class PagesModule { }
