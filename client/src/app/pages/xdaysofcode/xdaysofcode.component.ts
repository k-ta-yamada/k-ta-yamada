import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { XdaysofcodeService } from 'src/app/services/xdaysofcode.service';

@Component({
  selector: 'app-xdaysofcode',
  templateUrl: './xdaysofcode.component.html',
  styleUrls: ['./xdaysofcode.component.scss']
})
export class XdaysofcodeComponent implements OnInit {

  html: any;

  constructor(private service: XdaysofcodeService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.service.get().subscribe(r => {
      this.html = this.sanitizer.bypassSecurityTrustHtml(r.toString());
    });
  }

}
