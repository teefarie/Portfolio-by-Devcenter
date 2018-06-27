import {FacebookService, InitParams} from 'ngx-facebook';

export class MyComponentOrService {

  constructor(private fb: FacebookService) {
    let initParams: InitParams = {
      appId: '1727531764134340',
      xfbml: true,
      version: 'v2.10'
    };

    fb.init(initParams);
  }

}
