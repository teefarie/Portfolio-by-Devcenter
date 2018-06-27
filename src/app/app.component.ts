import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {AppService} from "../app.service";
import {AuthService} from "./_shared/services/auth.service";
import {isUndefined} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private _appService: AppService, private _auth: AuthService) {
  }

  ngOnInit() {
    // Router Settings
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  onClick(event) {
    if (this._appService.notification != null && this._appService.notification["stick"] == null) {
      this._appService.unsetNotification();
    }
  }
}
