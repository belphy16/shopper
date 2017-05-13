import { TestBed, inject } from '@angular/core/testing';

import { ShopItemsService } from './shop-items.service';

describe('ShopItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopItemsService]
    });
  });

  it('should be created', inject([ShopItemsService], (service: ShopItemsService) => {
    expect(service).toBeTruthy();
  }));
});
