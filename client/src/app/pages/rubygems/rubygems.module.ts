import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RubygemsComponent } from './rubygems.component';
import { RubygemsInfoComponent } from './rubygems-info/rubygems-info.component';
import { RubygemsChartComponent } from './rubygems-chart/rubygems-chart.component';

@NgModule({
  declarations: [
    RubygemsComponent,
    RubygemsInfoComponent,
    RubygemsChartComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class RubygemsModule { }
