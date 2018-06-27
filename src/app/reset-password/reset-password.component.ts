import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../app.service";
import {AuthService} from "../_shared/services/auth.service";
import {isUndefined} from "util";

@Component({
  selector: "reset-password",
  templateUrl: "reset-password.html"
})


export class ResetPasswordComponent {
  recoverPasswordToken: string;
  recoverPasswordEmail: string;
  submittingResettingPassword: boolean = false;

  constructor(private _routeParams: ActivatedRoute, private _authService: AuthService,
              private _appService: AppService, private router: Router) {
  }

  ngOnInit() {
    this._routeParams.params.subscribe(params => {
      this.recoverPasswordToken = params['token'];
      this.recoverPasswordEmail = params['email'];
    })
  }

  resetPassword(form) {
    form.value.token = this.recoverPasswordToken;
    form.value.email = this.recoverPasswordEmail;
    this.submittingResettingPassword = true;
    this._authService.recoverPassword(JSON.stringify(form.value), () => {
      this.submittingResettingPassword = false;
    }).subscribe(authUser => {
      if (authUser.status != isUndefined) {
        if (authUser.status == 200) {
          this._appService.setNotification(authUser);
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000)
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
    return;
  }
}
