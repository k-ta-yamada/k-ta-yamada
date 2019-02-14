import { TestBed } from '@angular/core/testing';

import { XdaysofcodeService } from './xdaysofcode.service';

xdescribe('XdaysofcodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XdaysofcodeService = TestBed.get(XdaysofcodeService);
    expect(service).toBeTruthy();
  });
});
