import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import { CommunityFundService } from 'src/app/services/community-fund.service';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css']
})
export class ProposalListComponent implements OnInit {
  constructor(public comFundService: CommunityFundService) {}
  buttonDebounce: Boolean = false;
  dataRefresher: Subscription;

  ngOnInit() {
    console.log('ProposalListComponent fetching new Proposal data');
    this.comFundService.fetchProposalVotes();
    this.comFundService.fetchProposals();

    this.dataRefresher = Observable.interval(30000).subscribe(val => {
      console.log('ProposalListComponent fetching new Proposal data');
      this.comFundService.fetchProposalVotes();
      this.comFundService.fetchProposals();
    });
  }
}
