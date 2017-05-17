import { TestBed, inject } from '@angular/core/testing';

import { ShopItemValidatorService } from './shop-item-validator.service';

describe('ShopItemValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopItemValidatorService]
    });
  });

  it('should be created', inject([ShopItemValidatorService], (service: ShopItemValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
