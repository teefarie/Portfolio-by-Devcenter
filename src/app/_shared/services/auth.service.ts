/**
 * Created by KolawoleBalogun on 4/15/17.
 */
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/finally';
import {Injectable, ElementRef} from '@angular/core'
import {environment} from '../../../environments/environment'

@Injectable()
export class AuthService {
  constructor(private _http: Http) {
  }

  login(param: Object, onComplete) {
    let url = environment.api_base_url + "login";
    return this._http.post(url, param)
      .map(res => res.json())
      .finally(() => {
        onComplete()
      });
  }

  forgotPassword(param: Object, onComplete) {
    let url = environment.api_base_url + "forgot-password";
    return this._http.post(url, param)
      .map(res => res.json())
      .finally(() => {
        onComplete()
      });
  }


  recoverPassword(param: Object, onComplete) {
    let url = environment.api_base_url + "recover-password-change";
    return this._http.post(url, param)
      .map(res => res.json())
      .finally(() => {
        onComplete()
      });
  }

  signUp(param: Object, onComplete) {
    let url = environment.api_base_url + "join";
    return this._http.post(url, param)
      .map(res => res.json())
      .finally(() => {
        onComplete()
      });
  }

  getUser(username?, onComplete?) {
    let url = environment.api_base_url + "get-user";
    if(username) url = environment.api_base_url + "get-user-by-username/" + username;
    let headers = new Headers({"Authorization": localStorage.getItem("token"), "Content-type": "application/json"});
    return this._http.get(url, {headers: headers})
      .map(res => res.json())
      .finally(() => {
        if (onComplete) {
          onComplete()
        }
      });
  }

  getUserProfile(username?, onComplete?) {
    let url = environment.api_base_url + "profile/get";
    if(username) url = environment.api_base_url + "profile/get/" + username;
    let headers = new Headers({"Authorization": localStorage.getItem("token"), "Content-type": "application/json"});
    return this._http.get(url, {headers: headers})
      .map(res => res.json())
      .finally(() => {
        if (onComplete) {
          onComplete()
        }
      });
  }

  updateUserProfile(param: Object, onComplete?) {
    let url = environment.api_base_url + "profile/update";
    let headers = new Headers({"Authorization": localStorage.getItem("token"), "Content-type": "application/json"});
    return this._http.post(url, param, {headers: headers})
      .map(res => res.json())
      .finally(() => {
        if (onComplete) {
          onComplete()
        }
      });
  }

  updateProfileImage(inputLogo: ElementRef, onComplete?) {
    let url = environment.api_base_url + "profile/update/profile-image";
    let headers = new Headers({"Authorization": localStorage.getItem("token")});

    let inputEl: HTMLInputElement = inputLogo.nativeElement;
    let fileCount: number = inputEl.files.length;
    let formData: FormData = new FormData();
    if (fileCount > 0) {
      formData.append('profile_image', inputEl.files.item(0));
    }

    return this._http.post(url, formData, {headers: headers})
      .map(res => res.json())
      .finally(() => {
        if (onComplete) {
          onComplete()
        }
      });
  }

  updateUserPassword(param: Object, onComplete?) {
    let url = environment.api_base_url + "user-change-password";
    let headers = new Headers({"Authorization": localStorage.getItem("token"), "Content-type": "application/json"});
    return this._http.post(url, param, {headers: headers})
      .map(res => res.json())
      .finally(() => {
        if (onComplete) {
          onComplete()
        }
      });
  }

  sendVerificationMail(param: Object, onComplete?) {
    let url = environment.api_base_url + "send-email-verification";
    let headers = new Headers({"Authorization": localStorage.getItem("token"), "Content-type": "application/json"});
    return this._http.post(url, param, {headers: headers})
      .map(res => res.json())
      .finally(() => {
        if (onComplete) {
          onComplete()
        }
      });
  }

  verifyEmail(param: Object, onComplete?){
    let url = environment.api_base_url + "email-verification";
    let headers = new Headers({"Authorization": localStorage.getItem("token"), "Content-type": "application/json"});
    return this._http.post(url, param, {headers: headers})
      .map(res => res.json())
      .finally(() => {
        if (onComplete) {
          onComplete()
        }
      });
  }
}
