import { TestBed, inject } from '@angular/core/testing';

import { FireBonusService } from './fire-bonus.service';

describe('FireBonusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireBonusService]
    });
  });

  it('should be created', inject([FireBonusService], (service: FireBonusService) => {
    expect(service).toBeTruthy();
  }));
});
