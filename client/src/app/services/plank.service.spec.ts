import { TestBed } from '@angular/core/testing';

import { PlankService, Plank } from './plank.service';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';

describe('PlankService', () => {
    let service: PlankService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(PlankService);
      httpClient = TestBed.inject(HttpClient);
      // MEMO: get is deprecated: from v8.0.0 use Type<T> or InjectionToken<T> (deprecation)
      //       refs: https://github.com/angular/angular/issues/29905
      httpTestingController = TestBed.inject(HttpTestingController);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should behave...', () => {
      const dummy_result = [
        { bg_color: 'red' },
      ];
      const mapped_result = [
        { bgColor: 'red' } as Plank,
      ];

      service.get().subscribe(
        data => expect(data).toEqual(mapped_result)
      );

      const req = httpTestingController.expectOne(`${service.url}`);
      expect(req.request.method).toEqual('GET');
      req.flush(dummy_result);
      httpTestingController.verify();
    });
  });
});
