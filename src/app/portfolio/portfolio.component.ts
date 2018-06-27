import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {AppService} from "../../app.service";
import {DomSanitizer, SafeStyle, Meta, Title} from "@angular/platform-browser";
import {AuthService} from "../_shared/services/auth.service";
import {isUndefined} from "util";
import {environment} from "../../environments/environment";
import {Router, ActivatedRoute} from "@angular/router";
import {stringFormatPipe} from "../_shared/pipes/string-format.pipe";

@Component({
  selector: "portfolio",
  templateUrl: "portfolio.html"
})


export class PortfolioComponent implements OnInit {
  avatarChange: Boolean = false;
  imageSrc: SafeStyle = null;
  uploadingProfileImage: boolean = false;
  environment: Object = null;
  userPortfolio: Object = null;
  user: Object = null;
  userCompletedRecommendation: Object = null;
  userUncompletedRecommendation: Object = null;
  username = null;

  @ViewChild('profile_image') profileImage: ElementRef;

  constructor(private _routeParams: ActivatedRoute, private _appService: AppService,
              private _sanitizer: DomSanitizer,
              private _authService: AuthService,
              private router: Router, private meta: Meta,
              private title: Title, private _stringFormat: stringFormatPipe) {
  }

  ngOnInit() {
    this._appService.getUser();

    this.environment = environment;
    this._routeParams.params.subscribe(params => {
      this.username = params['username'];
    });

    if (this.username != null) {
      this._authService.getUser(this.username).subscribe(response => {
        if (response.status != isUndefined) {
          if (response.status == 200) {
            this.userPortfolio = response.extras;
            this.user = response.extras.user;

            if (this.user != null) {
              this._authService.getUserProfile(this.username).subscribe(response => {
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
                  let description = "I'm primarily a " + this._stringFormat.transform(this.userPortfolio["roles_and_skills"].roles[0].value);
                  if (this.userPortfolio["roles_and_skills"].roles[1]) description += " who is also good at " + this._stringFormat.transform(this.userPortfolio["roles_and_skills"].roles[1].value);
                  if (this.userPortfolio["roles_and_skills"].roles[2]) description += " and " + this._stringFormat.transform(this.userPortfolio["roles_and_skills"].roles[2].value);

                  this.meta.addTag({name: 'description', content: description});

                  let fullname = this.user["first_name"];
                  if(this.user["last_name"]) fullname += " " + this.user["last_name"];

                  this.title.setTitle(fullname + "'s Portfolio");

                  if (this.user["completed_level"] < 4) {
                    this.router.navigateByUrl('/');
                  }

                }
              }, (err) => {
                this.router.navigateByUrl('/');
              });
            }
          }

          if (this.user["completed_level"] < 4) {
            this.router.navigateByUrl('/');
          }

        }
      }, (err) => {
        this.router.navigateByUrl('/');
      });
    }
  }

  onMouseOver(event) {
    this.avatarChange = true;
  }

  onMouseOut(event) {
    this.avatarChange = false;
  }

  onChange(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.uploadingProfileImage = true;
      this.avatarChange = true;
      const reader = new FileReader();
      reader.onload = ((e) => {
        this.imageSrc = e.target['result'];
      });
      reader.readAsDataURL(fileInput.target.files[0]);

      this._authService.updateProfileImage(this.profileImage, () => {
        this.uploadingProfileImage = false;
        this.avatarChange = false;
      }).subscribe(response => {
        if (response.status != isUndefined) {
          if (response.status == 200) {
          }
        }
      }, (err) => {
        this._appService.setNotification(JSON.parse(err._body));
      });
      return;
    }
  }
}
