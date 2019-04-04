import { Component, OnInit } from '@angular/core';
import { PlankService, Plank } from 'src/app/services/plank.service';

@Component({
  selector: 'app-plank',
  templateUrl: './plank.component.html',
  styleUrls: ['./plank.component.scss']
})
export class PlankComponent implements OnInit {

  record: Plank[];

  constructor(private plankService: PlankService) { }

  ngOnInit() {
    this.plankService.get().subscribe(
      record => this.record = record,
      console.error
    );
  }

}
