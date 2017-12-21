import { TestBed, inject } from '@angular/core/testing';

import { ElectricityBonusService } from './electricity-bonus.service';

describe('ElectricityBonusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectricityBonusService]
    });
  });

  it('should be created', inject([ElectricityBonusService], (service: ElectricityBonusService) => {
    expect(service).toBeTruthy();
  }));
});
