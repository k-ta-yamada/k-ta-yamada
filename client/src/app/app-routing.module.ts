import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ProfComponent } from './pages/prof/prof.component';

const routes: Routes = [
  // { path: '', redirectTo: 'index', pathMatch: 'full' },
  // { path: 'index', component: IndexComponent },
  { path: '', component: IndexComponent },
  { path: 'prof', component: ProfComponent },
  { path: 'article', component: IndexComponent },
  { path: 'rubygems', component: IndexComponent },
  { path: 'commit', component: IndexComponent },
  { path: 'plank', component: IndexComponent },
  { path: '100daysofcode', component: IndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
