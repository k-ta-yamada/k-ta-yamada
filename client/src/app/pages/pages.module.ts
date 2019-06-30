import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ArticlesComponent } from './articles/articles.component';
import { CommitComponent } from './commit/commit.component';
import { PlankComponent } from './plank/plank.component';
import { XdaysofcodeComponent } from './xdaysofcode/xdaysofcode.component';

import { IndexModule } from './index/index.module';
import { ProfileModule } from './profile/profile.module';
import { RubygemsModule } from './rubygems/rubygems.module';
import { LibsModule } from '../libs/libs.module';

@NgModule({
  declarations: [
    ArticlesComponent,
    CommitComponent,
    PlankComponent,
    XdaysofcodeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    IndexModule,
    ProfileModule,
    RubygemsModule,
    LibsModule,
  ]
})
export class PagesModule { }
