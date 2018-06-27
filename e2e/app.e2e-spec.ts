import { ProfilesPage } from './app.po';

describe('profiles App', () => {
  let page: ProfilesPage;

  beforeEach(() => {
    page = new ProfilesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
