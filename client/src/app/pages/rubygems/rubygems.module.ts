import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RubygemsComponent } from './rubygems.component';
import { RubygemsInfoComponent } from './rubygems-info/rubygems-info.component';
import { RubygemsChartComponent } from './rubygems-chart/rubygems-chart.component';
import { LibsModule } from 'src/app/libs/libs.module';

@NgModule({
  declarations: [
    RubygemsComponent,
    RubygemsInfoComponent,
    RubygemsChartComponent,
  ],
  imports: [
    CommonModule,
    LibsModule,
  ]
})
export class RubygemsModule { }
