import { Component, OnInit } from '@angular/core';
import { CommitService } from 'src/app/services/commit.service';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss']
})
export class CommitComponent implements OnInit {

  branches: string[];

  selectedBrancheName = 'master';

  constructor(private service: CommitService) { }

  ngOnInit() {
    this.service.getBranches().subscribe(
      (branches) => {
        this.branches = branches;
        this.service.getBranche(this.selectedBrancheName).subscribe(
          (r) => { console.log(r); },
          (error) => { console.error(error); },
        );
      },
      (error) => { console.error(error); },
    );
  }

}
