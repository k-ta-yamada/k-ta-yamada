import { TestBed } from '@angular/core/testing';

import { CommitService } from './commit.service';

describe('CommitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommitService = TestBed.get(CommitService);
    expect(service).toBeTruthy();
  });
});
