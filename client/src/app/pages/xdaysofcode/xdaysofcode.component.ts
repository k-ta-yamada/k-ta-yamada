import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-xdaysofcode',
  templateUrl: './xdaysofcode.component.html',
  styleUrls: ['./xdaysofcode.component.scss']
})
export class XdaysofcodeComponent implements OnInit {

  html: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.http.get('api/100daysofcode').subscribe(r => {
      console.log(r);
      this.html = this.sanitizer.bypassSecurityTrustHtml(r.toString());
    });
  }

}
