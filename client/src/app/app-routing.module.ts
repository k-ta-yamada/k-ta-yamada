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
  { path: 'profile', component: ProfileComponent, data: { animation: 'profile' } },
  { path: 'articles', component: ArticlesComponent, data: { animation: 'articles' } },
  { path: 'rubygems', component: RubygemsComponent, data: { animation: 'rubygems' } },
  { path: 'commit', component: CommitComponent, data: { animation: 'commit' } },
  { path: 'plank', component: PlankComponent, data: { animation: 'plank' } },
  { path: 'xdaysofcode', component: XdaysofcodeComponent, data: { animation: 'xdaysofcode' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
