import { Component, OnInit } from '@angular/core';
import { RubygemsService } from 'src/app/services/rubygems.service';

@Component({
  selector: 'app-rubygems',
  templateUrl: './rubygems.component.html',
  styleUrls: ['./rubygems.component.scss']
})
export class RubygemsComponent implements OnInit {

  gems;

  constructor(private service: RubygemsService) { }

  ngOnInit() {
    this.service.get().subscribe(
      (gems) => { this.gems = gems; },
      (error) => { console.error(error); },
    );
  }

}
