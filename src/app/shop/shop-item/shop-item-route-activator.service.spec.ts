import { TestBed, inject } from '@angular/core/testing';

import { ShopItemRouteActivatorService } from './shop-item-route-activator.service';

describe('ShopItemRouteActivatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopItemRouteActivatorService]
    });
  });

  it('should be created', inject([ShopItemRouteActivatorService], (service: ShopItemRouteActivatorService) => {
    expect(service).toBeTruthy();
  }));
});
