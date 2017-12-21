import { TestBed, inject } from '@angular/core/testing';

import { PropellersService } from './propellers.service';

describe('PropellersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropellersService]
    });
  });

  it('should be created', inject([PropellersService], (service: PropellersService) => {
    expect(service).toBeTruthy();
  }));
});
