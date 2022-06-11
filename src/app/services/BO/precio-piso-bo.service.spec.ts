import { TestBed } from '@angular/core/testing';

import { PrecioPisoBOService } from './precio-piso-bo.service';

describe('PrecioPisoBOService', () => {
  let service: PrecioPisoBOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecioPisoBOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
