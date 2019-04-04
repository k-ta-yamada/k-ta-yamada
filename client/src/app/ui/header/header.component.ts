import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    document.querySelectorAll('a').forEach(a => {
      this.renderer.listen(a, 'click', this.collapseHide);
    });
  }

  onClickOutside() {
    this.collapseHide();
  }

  private collapseHide() {
    document.querySelector('#navbarSupportedContent').classList.remove('show');

    // https://stackoverflow.com/questions/16680543/hide-twitter-bootstrap-nav-collapse-on-click/16680604#16680604
    // document.querySelector('button').click();
  }

}
