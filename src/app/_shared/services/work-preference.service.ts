/**
 * Created by KolawoleBalogun on 4/15/17.
 */
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/finally';
import {Injectable} from '@angular/core'
import {environment} from '../../../environments/environment'

@Injectable()
export class WorkPreferenceService {
  constructor(private _http: Http) {
  }

  save(param: Object, onComplete?) {
    let url = environment.api_base_url + "profile/work-preference/save";
    let headers = new Headers({"Authorization": localStorage.getItem("token")});
    return this._http.post(url, param, {headers: headers})
      .map(res => res.json())
      .finally(() => {
        if(onComplete) onComplete()
      });
  }
}
