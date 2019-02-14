import { Component, OnInit } from '@angular/core';
import { CommitService, Branch } from 'src/app/services/commit.service';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss']
})
export class CommitComponent implements OnInit {

  selectedBrancheName = 'master';

  brancheNames: string[];

  branche: Branch[];

  constructor(private service: CommitService) { }

  ngOnInit() {
    this.service.getBrancheNames().subscribe(
      (value) => {
        this.brancheNames = value;
        this.onChange();
      },
      (error) => { console.error(error); },
    );
  }

  onChange() {
    this.branche = [];
    this.service.getBranche(this.selectedBrancheName).subscribe(
      (value) => { this.branche = value; },
      (error) => { console.error(error); },
    );
  }

}
