import { browser, element, by } from 'protractor';

export class AngularAuth0AsidePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
