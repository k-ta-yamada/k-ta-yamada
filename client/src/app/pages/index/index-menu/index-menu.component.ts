import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/app-routing.module';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-index-menu',
  templateUrl: './index-menu.component.html',
  styleUrls: ['./index-menu.component.scss']
})
export class IndexMenuComponent implements OnInit {

  desc = {
    profile:     'My Profile and Skills.',
    articles:    'Articles written on <a href="https://qiita.com" target="_blank" rel="noopener">https://qiita.com</a>.',
    rubygems:    'My RubyGems info.',
    commit:      'The commit log of this site.',
    plank:       'Record of 30 days Plank Challenge.',
    xdaysofcode: 'Record of <a href="https://www.100daysofcode.com/" target="_blank" rel="noopener">#100DaysOfCode</a> Challenge.',
  };

  menus = routes.filter(r => r.path !== '').map(r => {
    return {
      path: r.path,
      desc: this.sanitizer.bypassSecurityTrustHtml(this.desc[r.path]),
    };
  });

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
