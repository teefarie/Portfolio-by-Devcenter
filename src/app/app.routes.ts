import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {ProfileBuilderComponent} from "./profile-builder/profile-builder.component";
import {PortfolioComponent} from "./portfolio/portfolio.component";
import {SettingsComponent} from "./settings/settings.component";
import {RecommendationComponent} from "./recommendation/recommendation.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ConnectComponent} from "./connect/connect.component";
import {VerifyEmailComponent} from "./verify-email/verify-email.component";

export const rootRouterConfig: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:email/:token', component: ResetPasswordComponent},
  {path: 'activate/:email/:token', component: VerifyEmailComponent},
  {path: 'portfolio-builder', component: ProfileBuilderComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'recommendation/:token', component: RecommendationComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'connect/:platform', component: ConnectComponent},
  {path: ':username', component: PortfolioComponent},
];

