import { ShopperPage } from './app.po';

describe('shopper App', () => {
  let page: ShopperPage;

  beforeEach(() => {
    page = new ShopperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
