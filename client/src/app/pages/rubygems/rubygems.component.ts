import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rubygems',
  templateUrl: './rubygems.component.html',
  styleUrls: ['./rubygems.component.scss']
})
export class RubygemsComponent implements OnInit {

  gems;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('api/rubygems.json').subscribe(r => {
    // this.http.get('api/commit/branches').subscribe(r => {
    // this.http.get('api/30day_plank_challenge').subscribe(r => {
    // this.http.get('api/articles').subscribe(r => {
    // this.http.get('api/100daysofcode').subscribe(r => {
        console.log(r);
        this.gems = r;
      });
  }

}
