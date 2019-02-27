import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import CFProposal from 'src/app/models/CFProposal.model';

import { CommunityFundService } from 'src/app/services/community-fund.service';
import { _getComponentHostLElementNode } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css']
})
export class ProposalListComponent implements OnInit {
  constructor(public comFundService: CommunityFundService) {}
  proposalList: Array<CFProposal>;
  proposalVotes: any;
  buttonDebounce: Boolean = false;
  dataRefresher: Subscription;

  ngOnInit() {
    console.log('Proposal list component fetching new Proposal data');
    this.comFundService.fetchProposalVotes();
    this.comFundService.fetchProposals();

    this.dataRefresher = Observable.interval(30000).subscribe(val => {
      console.log('Proposal list component fetching new Proposal data');
      this.comFundService.fetchProposalVotes();
      this.comFundService.fetchProposals();
    });
  }
}
