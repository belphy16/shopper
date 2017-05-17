import { TestBed, inject } from '@angular/core/testing';

import { ShopRecipeRouteActivatorService } from './shop-recipe-route-activator.service';

describe('ShopRecipeRouteActivatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopRecipeRouteActivatorService]
    });
  });

  it('should be created', inject([ShopRecipeRouteActivatorService], (service: ShopRecipeRouteActivatorService) => {
    expect(service).toBeTruthy();
  }));
});
