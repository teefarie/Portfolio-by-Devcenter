import {Component, AfterViewInit} from "@angular/core";
import {FacebookService, InitParams, LoginResponse} from "ngx-facebook";
import {SocialService} from "../services/social.service";
import {environment} from "../../../environments/environment";
import {isUndefined} from "util";
import {AppService} from "../../../app.service";

@Component({
  selector: "twitter-btn",
  template: `<a (click)="connectTwitter($event, 'twitter')" [class.connected]="_appService.user && _appService.user.tw_username">Connect<span
                *ngIf="_appService.user && _appService.user.tw_username">ed</span></a>`
})

export class SocialTwitterDirective implements AfterViewInit {
  constructor(private _social: SocialService, private _appService: AppService) {
  }

  ngAfterViewInit() {
  }

  connectTwitter(event, platform: string) {
    event.preventDefault();
    this._social.request_token(platform)
      .subscribe(response => {
        if (response.status != isUndefined) {
          if (response.status == 200) {
            window.location.href = environment.twitter_authenticate_url + response.extras.token;
          }
        }
      }, (err) => {
        // TODO: Catch Error Here
      });
    return;
  }
}
