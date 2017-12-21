import { TestBed, inject } from '@angular/core/testing';

import { ExplosiveBonusService } from './explosive-bonus.service';

describe('ExplosiveBonusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExplosiveBonusService]
    });
  });

  it('should be created', inject([ExplosiveBonusService], (service: ExplosiveBonusService) => {
    expect(service).toBeTruthy();
  }));
});
