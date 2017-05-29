import { Component, ViewChild, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Router, Route, NavigationStart } from '@angular/router';
import { MdSidenav } from '@angular/material';

import { routes } from './shop/shop.module';
import { UtilsService } from './shared/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') _sidenav: MdSidenav;
  sideNavMode: string;
  sidenavOpened: boolean;
  sideNavLinks: string[];
  activeSideNavIndex = 0;

  constructor(private _router: Router,
                private _eventManager: EventManager,
                private _utilsService: UtilsService) { }

  ngOnInit() {
    this.initSideNav();
  }

  /*  Helper Functions
      ==================================================================================== */
  initSideNav(event?: UIEvent) {
    const onMobile = this._utilsService.isOnMobile();
    const isResizing = event && event.type === 'resize';

    this.sideNavMode = onMobile ? 'over' : 'side';
    this.sidenavOpened = !onMobile;
    this._sidenav.toggle(!onMobile);

    if (!isResizing) {
      this.sideNavLinks = routes
        .filter((route: Route) => route.path.indexOf('/') === -1 && (route.path !== '404')) // filter out subroutes
        .map((route: Route) => route.path);

      // TODO: debounce
      this._eventManager.addGlobalEventListener('window', 'resize', this.initSideNav.bind(this));

      this._router.events
        .filter(event => event instanceof NavigationStart)
        .subscribe((event: NavigationStart) => {
          const activeSideNavIndex: number = this.sideNavLinks.indexOf(event.url.slice(1));
          const navigatedFromSideNav: boolean = activeSideNavIndex > -1;

          if (navigatedFromSideNav) {
            this.activeSideNavIndex = activeSideNavIndex;

            if (this._utilsService.isOnMobile()) {
              this._sidenav.close();
            }
          }
        });
    }
  }
}
