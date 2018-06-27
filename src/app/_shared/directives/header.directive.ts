import {Component, Input} from "@angular/core";
import {AppService} from "../../../app.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {AuthService} from "../services/auth.service";
import {isUndefined} from "util";

@Component({
  selector: "[header]",
  template: `
            <div class="notification" *ngIf="_appService.user && !_appService.user.activated">
                <div class="wrapper">
                    <div class="notification-holder">
                        <div class="notification-text">
                            <p>Confirm your email address to gain full access to your developer portfolio. A confirmation message was sent to <strong>{{ _appService.user.email.toLowerCase() }}</strong>.</p>
                        </div>
                        <div style="flex: 1"></div>
                        <div class="notification-cta">
                            <button (click)="resendVerification($event)" class="button" [disabled]="resendingVerificationMail">
                              <span *ngIf="!resendingVerificationMail">Resend confirmation</span>
                              <i class="fa fa-spinner fa-pulse fa-fw" aria-hidden="true" *ngIf="resendingVerificationMail"></i>
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div class="notification verified" *ngIf="_appService.emailVerified">
                <div class="wrapper">
                    <div class="notification-holder table-cell">
                        <div class="notification-text">
                            <p>Your email <strong>{{ _appService.user.email.toLowerCase() }}</strong> has been verfied.</p>
                        </div>
                    </div>
                </div>
            </div>

            <header class="header" [class.unverified]="_appService.user && (!_appService.user.activated || _appService.emailVerified)">
             <div class="wrapper"><div class="logo"><a href="">
              <img src="../../../assets/img/p-logo.svg"></a></div>
              <div class="right header-links"></div>
                  <nav *ngIf="_appService.user"><a class="burger" [class.active]="burgerActive" (click)="toggleBurger()"><i></i></a>
                    <ul class="menu">
                      <li class="menu-list nav-item-dropdown hidden">
                        <a class="dropdown-trigger">{{ _appService.user.first_name }} <i class="fa fa-angle-down" aria-hidden="true"></i></a>
                        
                        <ul class="dropdown-menu">
                            <li class="dropdown-menu-item">
                              <a [routerLink]="['/' + _appService.user.username]">Portfolio</a>
                            </li>
                            
                            <li class="dropdown-menu-item">
                              <a [routerLink]="['/portfolio-builder']">Edit Portfolio</a>
                            </li>

                            <li class="dropdown-menu-item">
                              <a [routerLink]="['/settings']">Account settings</a>
                            </li>
                            <li class="dropdown-menu-item">
                              <a (click)="signOut()">Sign out</a>
                            </li>
                        </ul>
                      </li>
                      
                      <li class="menu-list animated" [class.hide]="!burgerActive" [class.show]="burgerActive" [class.slideInDown]="burgerActive"><a [routerLink]="['/' + _appService.user.username]">Portfolio</a></li>
                      <li class="menu-list animated" [class.hide]="!burgerActive" [class.show]="burgerActive" [class.slideInDown]="burgerActive"><a [routerLink]="['/portfolio-builder']">Edit Portfolio</a></li>
                      <li class="menu-list animated" [class.hide]="!burgerActive" [class.show]="burgerActive" [class.slideInDown]="burgerActive"><a [routerLink]="['/settings']">Account settings</a></li>
                      <li class="menu-list animated" [class.hide]="!burgerActive" [class.show]="burgerActive" [class.slideInDown]="burgerActive"><a (click)="signOut()">Sign out</a></li>
                    </ul>
                  </nav>
              </div></header>
              
              <ng-container *ngIf="_appService.notification != null">
                <div class="alert animated fadeIn" [class.success]="_appService.notification.status == 200"
                [class.error]="_appService.notification.status != 200">
                  <p>{{ _appService.notification.extras.message }}</p>
                </div>
              </ng-container>
              `
})

export class HeaderDirective {
  burgerActive: boolean = false;
  resendingVerificationMail: boolean = false;

  @Input() showUserNavigation: Boolean = false;

  constructor(private _appService: AppService, private router: Router, private _authService: AuthService) {
  }

  toggleBurger() {
    this.burgerActive = !this.burgerActive;
  }

  signOut() {
    localStorage.removeItem("token");
    this._appService.user = null;
    this.router.navigateByUrl('/login');
  }

  resendVerification() {
    event.preventDefault();
    this.resendingVerificationMail = true;
    let params: Object = {activation_url: environment.base_url + "activate/`email`/`activation_code`"};
    this._authService.sendVerificationMail(JSON.stringify(params), () => {
      this.resendingVerificationMail = false;
    }).subscribe(authUser => {
      if (authUser.status != isUndefined) {
        if (authUser.status == 200) {
          this._appService.setNotification(authUser);
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
  }
}
