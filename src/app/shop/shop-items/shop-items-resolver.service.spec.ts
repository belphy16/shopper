import { TestBed, inject } from '@angular/core/testing';

import { ShopItemsResolverService } from './shop-items-resolver.service';

describe('ShopItemsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopItemsResolverService]
    });
  });

  it('should be created', inject([ShopItemsResolverService], (service: ShopItemsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
