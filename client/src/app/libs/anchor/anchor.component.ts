import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-anchor',
  templateUrl: './anchor.component.html',
  styleUrls: ['./anchor.component.scss']
})
export class AnchorComponent implements OnInit {

  @Input() href = '#';

  @Input() target: '_blank' | '_self' | '_top' | '_parent' = '_blank';

  get rel(): string {
    return this.target === '_blank' ? 'noopener' : '';
  }

  constructor() { }

  ngOnInit() {
  }

}
