import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ENTER_SCALE, TRANSITION_TEXT, TRANSITION_TEXT_ENTER } from 'src/app/ui/animations/transitions/transitions.constants';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home-top',
  templateUrl: './home-top.component.html',
  styleUrls: ['./home-top.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_TEXT_ENTER,
    // TRANSITION_AREA_SLIDE,
    // TRANSITION_IMAGE_SCALE,
    ENTER_SCALE,
    trigger('imageTransition', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }), // Initial state
        animate('1s ease-out', style({ opacity: 1, transform: 'translateY(0)' })) // Final state
      ]),
    ]),
  ]
})
export class HomeTopComponent implements OnInit {

  _mAnimTextEnded = false
  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler) { }

  ngOnInit(): void {
  }

  _onTextAnimationEnd($event: any) {
    // console.log("_onTextAnimationEnd", $event['toState'])
    if ($event['toState'] == "in") {
      // console.log("_onTextAnimationEnd")
      this._mAnimTextEnded = true
      // this.animAnimation()
      
    }
  }

}
