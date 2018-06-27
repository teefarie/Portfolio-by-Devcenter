import {Component, OnInit} from "@angular/core";
import {AuthService} from "../_shared/services/auth.service";
import {environment} from "../../environments/environment";
import {isUndefined} from "util";
import {AppService} from "../../app.service";

@Component({
  selector: "forgot-password",
  templateUrl: "forgot-password.html"
})


export class ForgotPasswordComponent implements OnInit {
  submittingForgotPassword: boolean = false;

  ngOnInit(): void {
  }

  constructor(private _authService: AuthService,
              private _appService: AppService) {
  }

  forgotPassword(form) {
    form.value.recovery_url = environment.base_url + "reset-password/`email`/`token`";
    this.submittingForgotPassword = true;
    this._authService.forgotPassword(JSON.stringify(form.value), () => {
      this.submittingForgotPassword = false;
    }).subscribe(authUser => {
      if (authUser.status != isUndefined) {
        if (authUser.status == 200) {
          this._appService.setNotification(authUser);
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
    return;
  }
}
