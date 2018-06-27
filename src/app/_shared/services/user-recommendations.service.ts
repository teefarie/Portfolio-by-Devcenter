/**
 * Created by KolawoleBalogun on 4/15/17.
 */
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/finally';
import {Injectable} from '@angular/core'
import {environment} from '../../../environments/environment'

@Injectable()
export class UserRecommendationService {
  constructor(private _http: Http) {
  }

  send_recommendation(param: Object, onComplete?) {
    let url = environment.api_base_url + "profile/recommendation/send";
    let headers = new Headers({"Authorization": localStorage.getItem("token")});
    return this._http.post(url, param, {headers: headers})
      .map(res => res.json())
      .finally(() => {
        if (onComplete) onComplete()
      });
  }


  send_completed_recommendation(param: Object, onComplete?) {
    let url = environment.api_base_url + "profile/recommendation/send/completed";
    let headers = new Headers({"Authorization": localStorage.getItem("token")});
    return this._http.post(url, param, {headers: headers})
      .map(res => res.json())
      .finally(() => {
        if (onComplete) onComplete()
      });
  }

  get_recommendations(onComplete?) {
    let url = environment.api_base_url + "profile/recommendations/get";
    let headers = new Headers({"Authorization": localStorage.getItem("token")});
    return this._http.get(url, {headers: headers})
      .map(res => res.json())
      .finally(() => {
        if (onComplete) onComplete()
      });
  }

  get_recommendation(token: string, onComplete?) {
    let url = environment.api_base_url + "recommendation/" + token;
    return this._http.get(url)
      .map(res => res.json())
      .finally(() => {
        if (onComplete) onComplete()
      });
  }

  delete_recommendation(param: Object, onComplete?){
    let url = environment.api_base_url + "recommendation/delete";
    let headers = new Headers({"Authorization": localStorage.getItem("token")});
    return this._http.post(url, param, {headers: headers})
      .map(res => res.json())
      .finally(() => {
        if (onComplete) onComplete()
      });
  }
}
