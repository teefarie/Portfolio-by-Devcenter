import {Component, AfterViewInit} from "@angular/core";
import {FacebookService, InitParams, LoginResponse} from "ngx-facebook";
import {AppService} from "../../../app.service";

@Component({
  selector: "facebook-btn",
  template: `<a (click)="connectFacebook($event)" [class.connected]="_appService.user && _appService.user.fb_username">Connect<span
                *ngIf="_appService.user && _appService.user.fb_username">ed</span></a>`
})

export class SocialFacebookDirective implements AfterViewInit {
  constructor(private _fb: FacebookService, private _appService: AppService) {
    let initParams: InitParams = {appId: '1727531764134340', xfbml: true, version: 'v2.10'};
    _fb.init(initParams);
  }

  ngAfterViewInit() {
  }

  connectFacebook(event) {
    event.preventDefault();
    this._fb.login()
      .then((response: LoginResponse) => {
        let token = response.authResponse.accessToken;
        window.location.href = "/connect/facebook?token=" + token;
      })
      .catch((error: any) => {
      });
  }
}
