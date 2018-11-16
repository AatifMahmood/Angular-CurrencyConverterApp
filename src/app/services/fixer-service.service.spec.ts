import { TestBed, inject } from '@angular/core/testing';

import { FixerServiceService } from './fixer-service.service';

describe('FixerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FixerServiceService]
    });
  });

  it('should be created', inject([FixerServiceService], (service: FixerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
