import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import { CommunityFundService } from 'src/app/services/community-fund.service';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css']
})
export class ProposalListComponent implements OnInit {
  constructor(
    public communityFundService: CommunityFundService,
    private notificationService: NotificationService,
    private toastService: MzToastService
  ) {}
  buttonDebounce: Boolean = false;
  dataRefresher: Subscription;
  filterBy: Array<string> = [];
  isEncrypted: Boolean;

  proposalFilterValue = 'PENDING';

  ngOnInit() {
    this.getData();
    this.dataRefresher = Observable.interval(30000).subscribe(val => {
      this.getData();
    });
  }

  updateFilter() {
    if (this.proposalFilterValue === 'ALL') {
      this.filterBy = [];
    } else if (this.proposalFilterValue === 'PENDING') {
      this.filterBy = ['pending'];
    } else if (this.proposalFilterValue === 'ACCEPTED') {
      this.filterBy = ['accepted'];
    } else if (this.proposalFilterValue === 'FAILED') {
      this.filterBy = ['expired', 'rejected'];
    }
  }

  getData() {
    console.log('ProposalListComponent fetching new Proposal data');
    this.communityFundService
      .fetchProposalVotes()
      .catch(error =>
        this.notificationService.addError(
          error,
          'Failed to get Community Fund Proposal Votes'
        )
      );
    this.communityFundService
      .fetchProposals()
      .catch(error =>
        this.notificationService.addError(
          error,
          'Failed to fetch Community Fund Proposals'
        )
      );
  }

  voteOnProposal(proposalHash: string, vote: string) {
    this.buttonDebounce = true;

    this.communityFundService
      .updateProposalVote(proposalHash, vote)
      .then(() => {
        this.toastService.show(
          `Successfully voted for ${proposalHash}`,
          4000,
          'green'
        );
        this.getData();
      })
      .catch(error => {
        this.notificationService.addError(
          error,
          `Failed to vote for ${proposalHash}`
        );
      })
      .finally(() => {
        this.buttonDebounce = false;
      });
  }
}
