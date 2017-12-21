import { TestBed, inject } from '@angular/core/testing';

import { ShieldsService } from './shields.service';

describe('ShieldsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShieldsService]
    });
  });

  it('should be created', inject([ShieldsService], (service: ShieldsService) => {
    expect(service).toBeTruthy();
  }));
});
