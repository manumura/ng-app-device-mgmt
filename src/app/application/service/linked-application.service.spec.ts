import { TestBed, inject } from '@angular/core/testing';

import { LinkedApplicationService } from './linked-application.service';

describe('LinkedApplicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkedApplicationService]
    });
  });

  it('should be created', inject([LinkedApplicationService], (service: LinkedApplicationService) => {
    expect(service).toBeTruthy();
  }));
});
