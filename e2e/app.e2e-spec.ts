import { AngularAuth0AsidePage } from './app.po';

describe('angular-auth0-aside App', () => {
  let page: AngularAuth0AsidePage;

  beforeEach(() => {
    page = new AngularAuth0AsidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
