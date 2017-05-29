import { TestBed, inject } from '@angular/core/testing';

import { LodashService } from './lodash.service';

describe('LodashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LodashService]
    });
  });

  it('should be created', inject([LodashService], (service: LodashService) => {
    expect(service).toBeTruthy();
  }));
});
