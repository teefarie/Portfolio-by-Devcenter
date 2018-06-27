import {Component, Input, OnInit} from "@angular/core";
import {AppService} from "../../../app.service";
import {UserRecommendationService} from "../services/user-recommendations.service";
import {isUndefined} from "util";

@Component({
  selector: 'pending-recommendation',
  template: `<form #form="ngForm" (ngSubmit)="sendRecommendation(form.form)" class="pending-text">
                <p>{{ recommendation.fullname }}</p>
                <p>{{ recommendation.email }}</p>
                <!-- <p>{{ recommendation.position }}</p> -->
                <button class="button small" [disabled]="!form.valid || submittingRecommendation">
                  Resubmit
                </button>
                
                <button class="button small stroked" [disabled]="!form.valid || deletingRecommendation" 
                (click)="deleteRecommendation(recommendation.id)">
                  Remove
                </button>

                <input type="hidden" [(ngModel)]="recommendation.fullname"
                       name="recommendation_full_name"/>
                <input type="hidden" [(ngModel)]="recommendation.email"
                       name="recommendation_email"/>
                <input type="hidden" [(ngModel)]="recommendation.position"
                       name="recommendation_position"/>
              </form>`,
})

export class RecommendationDirective implements OnInit {
  @Input() recommendation: Object;
  submittingRecommendation = false;
  deletingRecommendation = false;

  constructor(private _appService: AppService, private _userRecommendationService: UserRecommendationService) {
  }

  ngOnInit() {
  }

  sendRecommendation(form) {
    this.submittingRecommendation = true;
    this._userRecommendationService.send_recommendation(JSON.stringify(form.value), () => {
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

  deleteRecommendation(recommendation_id) {
    this.deletingRecommendation = true;
    let param: Object = {recommendation_id: recommendation_id};
    this._userRecommendationService.delete_recommendation(JSON.stringify(param), () => {
      this.deletingRecommendation = false;
    }).subscribe(response => {
      if (response.status != isUndefined) {
        if (response.status == 200) {
          this._appService.setNotification(response);
          this._appService.userUncompletedRecommendation = response.extras.recommendations.filter(
            recommendation => recommendation.completed === 0
          );
          this._appService.user = response.extras.user;
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
    return;
  }
}
