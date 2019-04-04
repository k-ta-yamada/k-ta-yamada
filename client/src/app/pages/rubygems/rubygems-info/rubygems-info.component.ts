import { Component, OnInit, Input } from '@angular/core';
import { GemInfo } from 'src/app/services/rubygems.service';

@Component({
  selector: 'app-rubygems-info',
  templateUrl: './rubygems-info.component.html',
  styleUrls: ['./rubygems-info.component.scss']
})
export class RubygemsInfoComponent implements OnInit {

  @Input() gem = new GemInfo;

  constructor() { }

  ngOnInit() {
  }

}
