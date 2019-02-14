import { TestBed } from '@angular/core/testing';

import { PlankService } from './plank.service';

xdescribe('PlankService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlankService = TestBed.get(PlankService);
    expect(service).toBeTruthy();
  });
});
