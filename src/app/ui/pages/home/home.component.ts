import { Component, OnInit, Renderer2, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[]
})
export class HomeComponent implements OnInit {

  isScrolled = false;

  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    window.addEventListener('scroll', () => {
      const scrollPosition = this.viewportScroller.getScrollPosition()[1];
      this.isScrolled = scrollPosition > 10;
      console.log('Scroll detected via ViewportScroller. Position:', scrollPosition);
    });
  }

}
