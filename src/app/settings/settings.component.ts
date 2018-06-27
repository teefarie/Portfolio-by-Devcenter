import {Component, OnInit, AfterViewInit} from "@angular/core";
import {AppService} from "../../app.service";
import {AuthService} from "../_shared/services/auth.service";
import {isUndefined} from "util";
import {environment} from "../../environments/environment";
import {FacebookService, LoginResponse, InitParams} from "ngx-facebook";
import {SocialService} from "../_shared/services/social.service";
import {Router} from "@angular/router";


@Component({
  selector: "settings",
  templateUrl: "settings.html"
})

export class SettingsComponent implements OnInit {
  submittingBasicInfo: boolean = false;
  changingPassword: boolean = false;
  submittingNotification: boolean = false;
  submittingMute: boolean = false;

  constructor(private _appService: AppService, private _authService: AuthService) {
  }

  ngOnInit() {
    this._appService.setUser();
  }

  updateProfile(form) {
    this.submittingBasicInfo = true;
    this._authService.updateUserProfile(JSON.stringify(form.value), () => {
      this.submittingBasicInfo = false;
    }).subscribe(response => {
      if (response.status != isUndefined) {
        if (response.status == 200) {
          this._appService.setNotification(response);
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
    return;
  }

  updateNotification(form) {
    this.submittingNotification = true;
    form.value.notification_reminder = (form.value.notification_reminder) ? "1" : "0";
    form.value.notification_newsletter = (form.value.notification_newsletter) ? "1" : "0";
    form.value.notification_job_matches = (form.value.notification_job_matches) ? "1" : "0";

    this._authService.updateUserProfile(JSON.stringify(form.value), () => {
      this.submittingNotification = false;
    }).subscribe(response => {
      if (response.status != isUndefined) {
        if (response.status == 200) {
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
    return;
  }

  updateMute(form) {
    this.submittingMute = true;
    this._authService.updateUserProfile(JSON.stringify(form.value), () => {
      this.submittingMute = false;
    }).subscribe(response => {
      if (response.status != isUndefined) {
        if (response.status == 200) {
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
    return;
  }

  changeUserPassword(form) {
    this.changingPassword = true;
    this._authService.updateUserPassword(JSON.stringify(form.value), () => {
      this.changingPassword = false;
    }).subscribe(response => {
      if (response.status != isUndefined) {
        if (response.status == 200) {
          this.changingPassword = false;
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
    return;
  }
}
