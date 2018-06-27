/**
 * Created by KolawoleBalogun on 4/15/17.
 */
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/finally';
import {Injectable} from '@angular/core'
import {environment} from '../../../environments/environment'

@Injectable()
export class SocialService {
  constructor(private _http: Http) {
  }

  request_token(platform: string, onComplete?) {
    let url = environment.api_base_url + "social/request-token/" + platform;
    let headers = new Headers({"Authorization": localStorage.getItem("token")});
    return this._http.get(url, {headers: headers})
      .map(res => res.json())
      .finally(() => {
        if (onComplete) onComplete()
      });
  }

  connect(params: string, onComplete?) {
    let paramsObject = JSON.parse(params);
    let url = environment.api_base_url + "social/connect/" + paramsObject["platform"];
    let headers = new Headers({"Authorization": localStorage.getItem("token")});
    return this._http.post(url, params, {headers: headers})
      .map(res => res.json())
      .finally(() => {
        onComplete()
      });
  }
}
