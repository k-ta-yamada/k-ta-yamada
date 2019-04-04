import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitComponent } from './commit.component';
import { of, throwError } from 'rxjs';
import { CommitService, Branch } from 'src/app/services/commit.service';

describe('CommitComponent', () => {
  let component: CommitComponent;
  let fixture: ComponentFixture<CommitComponent>;
  let service: CommitService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommitComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = fixture.debugElement.injector.get(CommitService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('success', () => {
      spyOn(service, 'getBranchNames').and.returnValue(of(['test']));
      spyOn(component, 'onChange');
      component.ngOnInit();
      expect(component.branchNames).toEqual(['test']);
      expect(component.onChange).toHaveBeenCalled();
    });

    it('error', () => {
      spyOn(service, 'getBranchNames').and.returnValue(throwError('error'));
      spyOn(console, 'error');
      component.ngOnInit();
      expect(component.branchNames).toBeUndefined();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('onChange', () => {
    const brances: Branch[] = [
      { sha: '12345abcde',
        commitMessage: 'commitMessage',
        commitAuthorDate: 'commitAuthorDate',
        commitAuthorName: 'commitAuthorName',
        htmlUrl: 'htmlUrl' }
    ];

    it('success', () => {
      spyOn(service, 'getBranch').and.returnValue(of(brances));
      component.onChange();
      expect(component.branch).toEqual(brances);
    });

    it('error', () => {
      spyOn(service, 'getBranch').and.returnValue(throwError('error'));
      spyOn(console, 'error');
      component.onChange();
      expect(component.branch).toEqual([]);
      expect(console.error).toHaveBeenCalled();
    });
  });
});
