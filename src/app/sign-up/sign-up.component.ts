import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {AuthService} from "../_shared/services/auth.service";
import {AppService} from "../../app.service";
import {isUndefined} from "util";
import {environment} from "../../environments/environment";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: "sign-up",
  templateUrl: "sign-up.html"
})


export class SignUpComponent implements OnInit {
  submittingSignUp: boolean = false;
  token: string = null;

  constructor(private router: Router,
              private _authService: AuthService,
              private _appService: AppService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.token = params['token'];
      });

    if (
      !(this.token == "9BUOL7SB6XOEON8R3A1Z88YZ5Q9VHXQ21L1DNH0BB6Z38ND0IKB4HPK6ITHE9QH3XH51GGDOX8PR1ZOR" ||
      this.token == "179A36EGMXT3ITY5SDD86OYS04BXJVQRQFPP3DDLQIQRPBTNYJ3QEWXS40SHUK2UOOPPKYTH2RWRNCV5" ||
      this.token == "YRSSDLNFFW3RUMQBKS653OTXOTRPZ6LWP5ULA1E1PI9VXEQWCXM8S98VA0P1HOOTYPPRA5WLWKTT3DHF")) {
      this.router.navigateByUrl('/');
    }
  }

  signUp(form) {
    this.submittingSignUp = true;
    form.value.send_mail = true;
    form.value.activation_url = environment.base_url + "activate/`email`/`activation_code`";
    this._authService.signUp(JSON.stringify(form.value), () => {
      this.submittingSignUp = false;
    }).subscribe(authUser => {
      if (authUser.status != isUndefined) {
        if (authUser.status == 200) {
          this._appService.setNotification(authUser);
          this._appService.user = authUser.extras.user;
          localStorage.setItem("token", authUser.extras.token);
          setTimeout(() => {
            this.router.navigateByUrl('/portfolio-builder');
          }, 50);
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
    return;
  }
}
