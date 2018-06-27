import {Component, AfterViewInit} from "@angular/core";
import {FacebookService, InitParams, LoginResponse} from "ngx-facebook";
import {SocialService} from "../services/social.service";
import {environment} from "../../../environments/environment";
import {isUndefined} from "util";
import {AppService} from "../../../app.service";

@Component({
  selector: "github-btn",
  template: `<a [href]="github" [class.connected]="_appService.user && _appService.user.git_username">Connect<span
                  *ngIf="_appService.user && _appService.user.git_username">ed</span></a>`
})

export class SocialGithubDirective implements AfterViewInit {
  github: string = environment.github_oauth_url + (new Date().getTime() * Math.random() + 1);
  constructor(private _social: SocialService, private _appService: AppService) {
  }

  ngAfterViewInit() {
  }

}
