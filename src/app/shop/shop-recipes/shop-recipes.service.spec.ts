import { TestBed, inject } from '@angular/core/testing';

import { ShopRecipesService } from './shop-recipes.service';

describe('ShopRecipesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopRecipesService]
    });
  });

  it('should be created', inject([ShopRecipesService], (service: ShopRecipesService) => {
    expect(service).toBeTruthy();
  }));
});
