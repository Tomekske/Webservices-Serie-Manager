import { TestBed, inject } from '@angular/core/testing';

import { AutorisationService } from './autorisation.service';

describe('AutorisationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutorisationService]
    });
  });

  it('should be created', inject([AutorisationService], (service: AutorisationService) => {
    expect(service).toBeTruthy();
  }));
});
