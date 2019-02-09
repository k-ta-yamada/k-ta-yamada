import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './index/index.component';
import { ProfComponent } from './prof/prof.component';
import { RubygemsComponent } from './rubygems/rubygems.component';
import { ArticlesComponent } from './articles/articles.component';
import { CommitComponent } from './commit/commit.component';
import { PlankComponent } from './plank/plank.component';
import { XdaysofcodeComponent } from './xdaysofcode/xdaysofcode.component';

@NgModule({
  declarations: [
    IndexComponent,
    ProfComponent,
    ArticlesComponent,
    RubygemsComponent,
    CommitComponent,
    PlankComponent,
    XdaysofcodeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ]
})
export class PagesModule { }
