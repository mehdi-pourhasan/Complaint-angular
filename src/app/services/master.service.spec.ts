import { TestBed } from '@angular/core/testing';

import { MasterServiceService } from './master.service';

describe('MasterServiceService', () => {
  let service: MasterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
