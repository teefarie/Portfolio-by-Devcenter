import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../_shared/services/auth.service";
import {isUndefined} from "util";
import {AppService} from "../../app.service";

@Component({
  selector: "verify-email",
  templateUrl: "verify-email.html"
})


export class VerifyEmailComponent {
  verifyEmailToken: string;
  verifyEmailEmail: string;

  constructor(private _routeParams: ActivatedRoute,
              private _authService: AuthService,
              private _appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    this._routeParams.params.subscribe(params => {
      this.verifyEmailToken = params['token'];
      this.verifyEmailEmail = params['email'];
      let verificationParams: Object = {token: this.verifyEmailToken, email: this.verifyEmailEmail};

      this._authService.verifyEmail(JSON.stringify(verificationParams), () => {
        this._appService.emailVerified = true;
        this._appService.setUser(true);
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
