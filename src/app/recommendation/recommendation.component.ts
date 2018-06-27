import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {isUndefined} from "util";
import {UserRecommendationService} from "../_shared/services/user-recommendations.service";
import {AppService} from '../../app.service';

@Component({
  selector: "recommendation",
  templateUrl: "recommendation.html"
})


export class RecommendationComponent implements OnInit {
  recommendationToken: string = null;
  recommendee: Object = null;
  languages: Object[] = [];
  submittingRecommendation: boolean = false;

  constructor(private _routeParams: ActivatedRoute,
              private _userRecommendationService: UserRecommendationService, private _appService: AppService) {
  }

  ngOnInit() {
    this._routeParams.params.subscribe(params => {
      this.recommendationToken = params['token'];
      if (!isUndefined(this.recommendationToken)) {
        this._userRecommendationService.get_recommendation(this.recommendationToken).subscribe(response => {
          if (response.status != isUndefined) {
            if (response.status == 200) {
              this.recommendee = response.extras.user;
              this.languages = response.extras.user.languages;
            }
          }
        })
      }
    })
  }

  sendCompletedRecommendation(form) {
    form.value.recommendation = this.languages;
    form.value.token = this.recommendationToken;
    this.submittingRecommendation = true;
    this._userRecommendationService.send_completed_recommendation(JSON.stringify(form.value), function () {
      this.submittingRecommendation = false;
    }).subscribe(response => {
      if (response.status != isUndefined) {
        if (response.status == 200) {
          this._appService.setNotification(response);
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
    return;
  }

  updateRecommendation(event: string, index: number, key: string) {
    this.languages[index][key] = event;
  }
}
