import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import { CommunityFundService } from 'src/app/services/community-fund.service';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import {
  NavDroidNotification,
  NotifType
} from 'src/app/notification-bar/NavDroidNotification.model';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css']
})
export class ProposalListComponent implements OnInit {
  constructor(
    public communityFundService: CommunityFundService,
    private notificationService: NotificationService
  ) {}
  buttonDebounce: Boolean = false;
  dataRefresher: Subscription;

  ngOnInit() {
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

    this.dataRefresher = Observable.interval(30000).subscribe(val => {
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
    });
  }

  voteOnProposal(proposalHash, vote) {
    this.buttonDebounce = true;

    this.communityFundService
      .updatePaymentRequestVote(proposalHash, vote)
      .then(() => {
        this.notificationService.addNotification(
          new NavDroidNotification(
            `Successfully voted for ${proposalHash}`,
            NotifType.SUCCESS
          )
        );
        this.communityFundService.fetchPaymentRequestVotes();
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
