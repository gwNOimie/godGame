import { TestBed, inject } from '@angular/core/testing';

import { GearsService } from './gears.service';

describe('GearsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GearsService]
    });
  });

  it('should be created', inject([GearsService], (service: GearsService) => {
    expect(service).toBeTruthy();
  }));
});
