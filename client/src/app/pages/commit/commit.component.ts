import { Component, OnInit } from '@angular/core';
import { CommitService, Branch } from 'src/app/services/commit.service';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss']
})
export class CommitComponent implements OnInit {

  selectedBranchName = 'master';

  branchNames: string[];

  branch: Branch[];

  constructor(private service: CommitService) { }

  ngOnInit() {
    this.service.getBranchNames().subscribe(
      (value) => {
        this.branchNames = value;
        this.onChange();
      },
      (error) => { console.error(error); },
    );
  }

  onChange() {
    this.branch = [];
    this.service.getBranch(this.selectedBranchName).subscribe(
      (value) => { this.branch = value; },
      (error) => { console.error(error); },
    );
  }

}
