import {Injectable, OnInit, Inject} from '@angular/core'
import {Observable} from "rxjs";
import {AuthService} from "./app/_shared/services/auth.service";
import {isUndefined} from "util";
import {Router} from "@angular/router";


export class AppService implements OnInit {
  user: Object = null;
  userPortfolio = null;
  userCompletedRecommendation = null;
  userUncompletedRecommendation = null;
  notification: Object = null;
  emailVerified: Boolean = false;

  constructor(@Inject(AuthService) private _authService: AuthService, @Inject(Router) private router: Router) {
  }

  ngOnInit() {
  }

  setNotification(param: Object) {
    this.notification = param;
  }

  unsetNotification() {
    this.notification = null;
  }

  getUser(){
    this._authService.getUser().subscribe(response => {
      if (response.status != isUndefined) {
        if (response.status == 200) {
          this.user = response.extras.user;
        }
      }
    });
  }

  setUser(takePortfolio?: boolean) {
    this._authService.getUser().subscribe(response => {
      if (response.status != isUndefined) {
        if (response.status == 200) {
          this.user = response.extras.user;

          // Get Portfolio
          this._authService.getUserProfile().subscribe(response => {
            if (response.status != isUndefined) {
              if (response.status == 200) {
                this.userPortfolio = response.extras;
                if (response.extras.recommendations != null) {
                  this.userCompletedRecommendation = response.extras.recommendations.filter(
                    recommendation => recommendation.completed == 1
                  );

                  this.userUncompletedRecommendation = response.extras.recommendations.filter(
                    recommendation => recommendation.completed == 0
                  );
                }
              }

              if (this.user["completed_level"] < 4) {
                this.router.navigateByUrl('/portfolio-builder');
              } else {
                if (takePortfolio) {
                  this.router.navigateByUrl('/' + this.user["username"]);
                }
              }

            }
          }, (err) => {
            this.router.navigateByUrl('/login');
          });

        }
      }
    }, (err) => {
      this.router.navigateByUrl('/login');
    });
  }
}
