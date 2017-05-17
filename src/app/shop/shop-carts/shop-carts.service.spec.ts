import { TestBed, inject } from '@angular/core/testing';

import { ShopCartsService } from './shop-carts.service';

describe('ShopCartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopCartsService]
    });
  });

  it('should be created', inject([ShopCartsService], (service: ShopCartsService) => {
    expect(service).toBeTruthy();
  }));
});
