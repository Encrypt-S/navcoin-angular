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
    this.getData();

    this.dataRefresher = Observable.interval(30000).subscribe(val => {
      this.getData();
    });
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
        this.notificationService.addNotification(
          new NavDroidNotification(
            `Successfully voted for ${proposalHash}`,
            NotifType.SUCCESS
          )
        );
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
