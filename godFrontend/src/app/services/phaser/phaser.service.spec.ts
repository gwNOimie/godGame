import { TestBed, inject } from '@angular/core/testing';

import { PhaserService } from './phaser.service';

describe('PhaserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhaserService]
    });
  });

  it('should be created', inject([PhaserService], (service: PhaserService) => {
    expect(service).toBeTruthy();
  }));
});
