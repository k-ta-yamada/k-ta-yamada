import { TestBed } from '@angular/core/testing';

import { CommitService, Branch } from './commit.service';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestObject } from 'protractor/built/driverProviders';

describe('CommitService', () => {
  let service: CommitService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(CommitService);
    httpClient = TestBed.get(HttpClient);
    // MEMO: get is deprecated: from v8.0.0 use Type<T> or InjectionToken<T> (deprecation)
    //       refs: https://github.com/angular/angular/issues/29905
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBrancheNames', () => {
    it('should behave...', () => {
      const dummy_result = [
        'branch 1',
        'branch 2',
      ];

      service.getBranchNames().subscribe(
        data => expect(data).toEqual(dummy_result)
      );

      const req = httpTestingController.expectOne(`${service.url}/branches`);
      expect(req.request.method).toEqual('GET');
      req.flush(dummy_result);
      httpTestingController.verify();
    });
  });

  describe('getBranche', () => {
    it('should behave...', () => {
      const dummy_result = [
        { sha: 'a1b2c3d4', commit_message: 'commitMessage' },
        { sha: 'e5f6g7h8', commit_message: 'commitMessage' },
      ];
      const mapped_result = [
        { sha: 'a1b2c3d4', commitMessage: 'commitMessage' } as Branch,
        { sha: 'e5f6g7h8', commitMessage: 'commitMessage' } as Branch,
      ];

      service.getBranch('a').subscribe(
        data => expect(data).toEqual(mapped_result)
      );

      const req = httpTestingController.expectOne(`${service.url}/commits?branch=a`);
      expect(req.request.method).toEqual('GET');
      req.flush(dummy_result);
      httpTestingController.verify();
    });
  });
});
