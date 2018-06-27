import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../_shared/services/auth.service";
import {isUndefined} from "util";
import {AppService} from "../../app.service";

@Component({
  selector: "login",
  templateUrl: "login.html"
})


export class LoginComponent {
  submittingLogin: boolean = false;

  constructor(private router: Router, private _authService: AuthService, private _appService: AppService) {
  }

  login(form) {
    this.submittingLogin = true;
    this._authService.login(JSON.stringify(form.value), () => {
      this.submittingLogin = false;
    }).subscribe(authUser => {
      if (authUser.status != isUndefined) {
        if (authUser.status == 200) {
          this._appService.setNotification(authUser);
          this._appService.user = authUser.extras.user;
          localStorage.setItem("token", authUser.extras.token);
          setTimeout(() => {
            if (authUser.extras.user.completed_level < 4) {
              this.router.navigateByUrl('/portfolio-builder');
            } else {
              this.router.navigateByUrl('/' + authUser.extras.user.username);
            }
          }, 50);
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
    return;
  }
}
