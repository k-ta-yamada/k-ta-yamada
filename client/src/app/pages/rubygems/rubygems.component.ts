import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RubygemsService, GemInfo } from 'src/app/services/rubygems.service';

// import * as c3 from 'c3';

@Component({
  selector: 'app-rubygems',
  templateUrl: './rubygems.component.html',
  styleUrls: ['./rubygems.component.scss']
})
export class RubygemsComponent implements OnInit, AfterViewInit {

  gems: GemInfo[];

  // private data: any[] = ['data', 1, 2, 3, 4, 5];
  // private chart: c3.ChartAPI;

  constructor(private service: RubygemsService) { }

  ngOnInit() {
    this.service.get().subscribe(
      (gems) => { this.gems = gems; },
      (error) => { console.error(error); },
    );
  }

  ngAfterViewInit() {
    // this.chart = c3.generate({
    //   bindto: '#chart',
    //   data: {
    //     columns: [this.data]
    //   }
    // });
  }

}
