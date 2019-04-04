import { Component, OnInit, Input } from '@angular/core';
import { RubygemsService, GemVersion } from 'src/app/services/rubygems.service';

import * as c3 from 'c3';

@Component({
  selector: 'app-rubygems-chart',
  templateUrl: './rubygems-chart.component.html',
  styleUrls: ['./rubygems-chart.component.scss']
})
export class RubygemsChartComponent implements OnInit {

  @Input() gemname: string;

  chart: c3.ChartAPI;

  constructor(private rubygemsService: RubygemsService) { }

  ngOnInit() {
    this.rubygemsService.getVersions(this.gemname).subscribe(
      gemVersions => this.generateChart(gemVersions),
      console.error
    );
  }

  generateChart(gemVersions: GemVersion[]) {
    this.chart = c3.generate({
      bindto: `#chart-${this.gemname}`,
      size: {
        height: 375,
      },
      data: {
        json: gemVersions,
        keys: { value: ['number', 'downloads_count'] },
        x: 'number',
        labels: true,
        names: { downloads_count: 'downloads/version' }
      },
      axis: {
        x: {
          type: 'category',
          tick: { rotate: 90, multiline: false },
        }
      },
      grid: { y: { show: true } },
      line: { connectNull: true },
      area: { zerobased: false },
      bar: { zerobased: false, width: { ratio: 0.4 } },
    });
  }

}
