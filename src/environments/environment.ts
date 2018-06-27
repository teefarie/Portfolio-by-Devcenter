// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api_base_url: "http://alpha.developers.devcenter.co/api/",
  base_url: "http://localhost:4200/",
  github_oauth_url: "http://github.com/login/oauth/authorize?client_id=Iv1.510eadbd764f4241&redirect_uri=http://localhost:4200/connect/github&state=",
  twitter_request_token_url: 'https://api.twitter.com/oauth/request_token',
  twitter_access_token_url: 'https://api.twitter.com/oauth/access_token',
  twitter_authenticate_url: 'https://api.twitter.com/oauth/authenticate?',
  color_codes: {
    "a": "rgb(26, 188, 156)", "b": "rgb(46, 204, 113)", "c": "rgb(52, 152, 219)", "d": "rgb(155, 89, 182)",
    "e": "rgb(52, 73, 94)", "f": "rgb(22, 160, 133)", "g": "rgb(39, 174, 96)", "h": "rgb(41, 128, 185)",
    "i": "rgb(142, 68, 173)", "j": "rgb(44, 62, 80)", "k": "rgb(241, 196, 15)", "l": "rgb(230, 126, 34)",
    "m": "rgb(231, 76, 60)", "n": "rgb(192, 57, 43)", "o": "rgb(211, 84, 0)", "p": "rgb(243, 156, 18)",
    "q": "rgb(255, 152, 0)", "r": "rgb(96, 125, 139)", "s": "rgb(255, 87, 34)", "t": "rgb(0,0,0)",
    "u": "rgb(233, 30, 99)", "v": "rgb(0, 150, 136)", "w": "rgb(158, 158, 158)", "x": "rgb(63, 81, 181)",
    "y": "rgb(149, 165, 166)", "z": "rgb(127, 140, 141)"
  }
};
