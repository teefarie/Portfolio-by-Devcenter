import {Component, OnInit} from "@angular/core";
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";
import {isUndefined} from "util";
import {SocialService} from "../_shared/services/social.service";

@Component({
  selector: "settings",
  template: ""
})


export class ConnectComponent implements OnInit {
  connectingSocialAccount: boolean = false;

  constructor(private _routeParams: ActivatedRoute,
              private _appService: AppService, private _socialService: SocialService) {
  }

  ngOnInit(): void {
    this._routeParams.params.subscribe(params => {
      let platform = params['platform'];
      let requestParams: Object = {platform: platform};
      if (platform.toLowerCase() == "github") {
        requestParams["code"] = this._routeParams.snapshot.queryParams['code'];
        requestParams["state"] = this._routeParams.snapshot.queryParams['state'];
      } else if (platform.toLowerCase() == "google" || platform.toLowerCase() == "facebook") {
        requestParams["token"] = this._routeParams.snapshot.queryParams['token'];
      } else if (platform.toLowerCase() == "twitter") {
        requestParams["oauth_token"] = this._routeParams.snapshot.queryParams['oauth_token'];
        requestParams["oauth_verifier"] = this._routeParams.snapshot.queryParams['oauth_verifier'];
      }

      this.connectingSocialAccount = true;
      this._socialService.connect(JSON.stringify(requestParams), () => {
        this.connectingSocialAccount = false;
        window.location.href = '/portfolio-builder#social-account';
      }).subscribe(authUser => {
        if (authUser.status != isUndefined) {
          if (authUser.status == 200) {
            this._appService.setNotification(authUser);
            this._appService.user = authUser.extras.user;
          }
        }
      }, (err) => {
        this._appService.setNotification(JSON.parse(err._body));
      });
    })
  }
}
