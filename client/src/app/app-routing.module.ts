import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { RubygemsComponent } from './pages/rubygems/rubygems.component';
import { CommitComponent } from './pages/commit/commit.component';
import { PlankComponent } from './pages/plank/plank.component';
import { XdaysofcodeComponent } from './pages/xdaysofcode/xdaysofcode.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'index', pathMatch: 'full' },
  // { path: 'index', component: IndexComponent },
  { path: '', component: IndexComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'rubygems', component: RubygemsComponent },
  { path: 'commit', component: CommitComponent },
  { path: 'plank', component: PlankComponent },
  { path: 'xdaysofcode', component: XdaysofcodeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
