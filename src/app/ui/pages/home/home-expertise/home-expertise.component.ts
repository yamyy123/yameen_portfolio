import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ReplaySubject, takeUntil, startWith, map, scan, distinctUntilChanged, takeWhile, switchMap, Observable } from 'rxjs';
import { TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-expertise',
  templateUrl: './home-expertise.component.html',
  styleUrls: ['./home-expertise.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class HomeExpertiseComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false

  /* ********************************************************************************************
    *                anims
    */
  _mTriggerAnim?= 'false'

  _mTriggerImage?= 'false'


  _mThreshold = 0.2


  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler) { }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {

    this.destroyed$.next(true)
    this.destroyed$.complete()
  }


  public setupAnimation() {
    if (!this.vAnimRefView) return;

    // console.info("home products setupAnimation: " )
    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      // Makes sure to dispose on destroy
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
          // console.log("product app-item UiUtilsView visibility: ", visibility)
          return visibility;
        }
        return 0;

      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      // Distincts the resulting triggers 
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => {
        // console.info("app-item  !trigger || !this.mOnceAnimated",
        //   !trigger || !this.mOnceAnimated)

        return !trigger || !this.mOnceAnimated
      }, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {


      // console.log("home-item setupAnimation ancestorScrolled: ", val)

      if (this.mOnceAnimated) {
        return;
      }

      if (val) {
        // console.log("HomeProductsComponent setupAnimation setupAnimation ancestorScrolled: ", val)

        this.mOnceAnimated = true
        this._mTriggerAnim = 'true'
        this.cdr.detectChanges()
      }
      // if (this.vImageArea != null) {
      //   var visibility = UiUtilsView.getVisibility(this.vImageArea, this.viewPortRuler)
      //   console.log("UiUtilsView visibility: ", visibility)
      // }
    }

    )
  }

  _mTools = [

    // design
    {
      "id": "5131",
      "name": "Java",
      "logo": "assets/img/tools/java-logo.png",
      "link": "https://www.java.com/",
      "tab": "design"
    },
    {
      "id": "5131",
      "name": "TypeScript",
      "logo": "assets/img/tools/typescript.png",
      "link": "https://www.typescriptlang.org/",
      "tab": "design"
    },

    {
      "id": "5132",
      "name": "Postman",
      "logo": "assets/img/tools/postman.png",
      "link": "https://www.postman.com/",
      "tab": "design"
    },
    {
      "id": "5133",
      "name": "Golang",
      "logo": "assets/img/tools/golang.png",
      "link": "https://go.dev/",
      "tab": "design"
    },
    {
      "id": "5134",
      "name": "MongoDB",
      "logo": "assets/img/tools/mongodb.png",
      "link": "https://www.mongodb.com/",
      "tab": "design"
    },



//     // android
    {
      "id": "9110",
      "name": "Jira",
      "logo": "assets/img/tools/jira.png",
      "link": "https://www.atlassian.com/",
      "tab": "android",
    },
    {
      "id": "9112",
      "name": "Postgresql",
      "logo": "assets/img/tools/postgresql.png",
      "link": "https://www.postgresql.org/",
      "tab": "android"
    },
    {
      "id": "9113",
      "name": "Nats",
      "logo": "assets/img/tools/nats.png",
      "link": "https://nats.io/",
      "tab": "android"
    },
    {
      "id": "9114",
      "name": "Docker",
      "logo": "assets/img/tools/docker.png",
      "link": "https://www.docker.com/",
      "tab": "android"
    },
    {
      "id": "9115",
      "name": "Git",
      "logo": "assets/img/tools/git.png",
      "link": "https://git-scm.com/",
      "tab": "android"
    },
    {
      "id": "9116",
      "name": "Github",
      "logo": "assets/img/tools/github.jpeg",
      "link": "https://github.com/",
      "tab": "android"
    },

//     // cross
{
      "id": "4101",
      "name": "linux",
      "logo": "assets/img/tools/linux.jpeg",
      "link": "https://ubuntu.com/",
      "tab": "Cross",
    },

//     // web

    

    {
      "id": "8102",
      "name": "HTML",
      "logo": "assets/img/tools/html.png",
      "link": "https://html.com/",
      "tab": "web"
    },

    {
      "id": "8103",
      "name": "CSS",
      "logo": "assets/img/tools/css.png",
      "link": "https://www.w3.org/Style/CSS/Overview.en.html",
      "tab": "web"
    },
    {
      "id": "8105",
      "name": "K6",
      "logo": "assets/img/tools/k6.png",
      "link": "https://k6.io/",
      "tab": "web"
    },
    {
      "id": "8108",
      "name": "C",
      "logo": "assets/img/tools/c.png",
      "link": "https://www.learn-c.org/",
      "tab": "web",
    },
    {
      "id": "8106",
      "name": "C++",
      "logo": "assets/img/tools/c++.png",
      "link": "https://isocpp.org/",
      "tab": "web"
    },
//     {
//       "id": "8104",
//       "name": "Ngrx",
//       "logo": "assets/img/tools/ngrx.svg",
//       "link": "https://ngrx.io/",
//       "tab": "web"
//     },
    {
      "id": "8101",
      "name": "Angular",
      "logo": "assets/img/tools/angular.png",
      "link": "https://angular.dev/",
      "tab": "web",
      "color": "#FF4369"
    },
    // {
    //   "id": "8109",
    //   "name": "Scully",
    //   "logo": "assets/img/tools/scully.svg",
    //   "link": "https://https://scully.io/",
    //   "tab": "web",
    // },

    // // backend

    // {
    //   "id": "7121",
    //   "name": "Express",
    //   "logo": "assets/img/tools/express.png",
    //   "link": "https://expressjs.com/",
    //   "tab": "back-end"
    // },
    // {
    //   "id": "7122",
    //   "name": "Sequelize",
    //   "logo": "assets/img/tools/sequelize.png",
    //   "link": "http://docs.sequelizejs.com/",
    //   "tab": "back-end"
    // },

    // {
    //   "id": "7126",
    //   "name": "NodeJs",
    //   "logo": "assets/img/tools/nodejs.png",
    //   "link": "https://nodejs.org/en/",
    //   "tab": "back-end"
    // },

    // // cloud

    // {
    //   "id": "6121",
    //   "name": "Firebase",
    //   "logo": "assets/img/tools/firebase.svg",
    //   "link": "https://firebase.google.com/",
    //   "tab": "cloud"
    // },

    // {
    //   "id": "6123",
    //   "name": "Azure",
    //   "logo": "assets/img/tools/azure.png",
    //   "link": "https://azure.microsoft.com",
    //   "tab": "cloud"
    // },

    // {
    //   "id": "6124",
    //   "name": "Google cloud",
    //   "logo": "assets/img/tools/google-cloud.png",
    //   "link": "https://cloud.google.com/",
    //   "tab": "cloud"
    // },


  ]

}
