import {Component, AfterViewInit} from "@angular/core";
import {AppService} from "../../../app.service";

declare const gapi: any;

@Component({
  selector: "google-btn",
  template: `<a id="googleBtn" [class.connected]="_appService.user && _appService.user.google_username">Connect<span
                *ngIf="_appService.user && _appService.user.google_username">ed</span></a>`
})

export class SocialGoogleDirective implements AfterViewInit {
  public auth2: any;

  constructor(private _appService: AppService) {
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '98895966020-gqfj7l4430gsl5s8n3obght3ego57t86.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        let token = googleUser.getAuthResponse().id_token;
        window.location.href = "/connect/google?token=" + token;

      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}
