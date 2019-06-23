import { Component, OnInit } from '@angular/core';
import { RubygemsService, GemInfo } from 'src/app/services/rubygems.service';

@Component({
  selector: 'app-rubygems',
  templateUrl: './rubygems.component.html',
  styleUrls: ['./rubygems.component.scss']
})
export class RubygemsComponent implements OnInit {

  gems: GemInfo[];

  constructor(private rubygemsService: RubygemsService) { }

  ngOnInit() {
    this.rubygemsService.get().subscribe(
      gems => this.gems = gems,
      console.error
    );
  }

}
