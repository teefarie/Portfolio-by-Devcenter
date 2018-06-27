import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {LoginComponent} from "./login/login.component";
import {HeaderDirective} from "./_shared/directives/header.directive";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {ProfileBuilderComponent} from "./profile-builder/profile-builder.component";
import {AuthService} from "./_shared/services/auth.service";
import {AppService} from "../app.service";
import {ParseRecommendationRecipientNamePipe} from "./_shared/pipes/parse-recommendation-recipeient-name.pipe";
import {UserRecommendationService} from "./_shared/services/user-recommendations.service";
import {ExplodePipe} from "./_shared/pipes/explode.pipe";
import {StringifyNumberPipe} from "./_shared/pipes/stringify-number.pipe";
import {RolesAndSkillsService} from "./_shared/services/roles-and-skills.service";
import {ProjectsService} from "./_shared/services/projects.service";
import {WorkPreferenceService} from "./_shared/services/work-preference.service";
import {PortfolioComponent} from "./portfolio/portfolio.component";
import {SettingsComponent} from "./settings/settings.component";
import {RecommendationComponent} from "./recommendation/recommendation.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {stringFormatPipe} from "./_shared/pipes/string-format.pipe";
import {RolesPlaceholderPipe} from "./_shared/pipes/roles-placeholder.pipe";
import {TitleCasePipe} from "@angular/common";
import {RatingDirective} from "./_shared/directives/rating-star.directives";
import {ConnectComponent} from "./connect/connect.component";
import {FacebookService} from "ngx-facebook";
import {SocialService} from "./_shared/services/social.service";
import {SocialGoogleDirective} from "./_shared/directives/social-google.directive";
import {SocialFacebookDirective} from "./_shared/directives/social-facebook.directive";
import {SocialTwitterDirective} from "./_shared/directives/social-twitter.directive";
import {RecommendationDirective} from "./_shared/directives/pending-recommendation.directives";
import {LocationDirective} from "./_shared/directives/location.directive";
import {Ng2PageScrollModule} from "ng2-page-scroll";
import {GetInitialsPipe} from "./_shared/pipes/get-initials.pipe";
import {VerifyEmailComponent} from "./verify-email/verify-email.component";
import {titleCasePipe} from "./_shared/pipes/title-case.pipe";
import {workTypeFormatPipe} from "./_shared/pipes/work-type-format.pipe";
import {SocialGithubDirective} from "./_shared/directives/social-github.directive";

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileBuilderComponent,
    PortfolioComponent,
    SettingsComponent,
    RecommendationComponent,
    ChangePasswordComponent,
    ConnectComponent,
    VerifyEmailComponent,
    AppComponent,
    HeaderDirective,
    RatingDirective,
    SocialGoogleDirective,
    SocialFacebookDirective,
    SocialTwitterDirective,
    SocialGithubDirective,
    RecommendationDirective,
    LocationDirective,
    ParseRecommendationRecipientNamePipe,
    stringFormatPipe,
    RolesPlaceholderPipe,
    StringifyNumberPipe,
    titleCasePipe,
    GetInitialsPipe,
    workTypeFormatPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2PageScrollModule,
    RouterModule.forRoot(rootRouterConfig, {useHash: false}),
  ],
  providers: [AppService, AuthService,
    UserRecommendationService, RolesAndSkillsService, ProjectsService,
    WorkPreferenceService, FacebookService, SocialService, TitleCasePipe, ExplodePipe, stringFormatPipe, RolesPlaceholderPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
