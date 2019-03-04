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
  selector: 'app-homepage-proposal-list',
  templateUrl: './homepage-proposal-list.component.html',
  styleUrls: [
    '../homepage.component.css',
    './homepage-proposal-list.component.css'
  ]
})
export class HomepageProposalListComponent implements OnInit {
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
    console.log('HomepageProposalListComponent fetching new Proposal data');
    this.communityFundService
      .fetchProposalVotes()
      .catch(error =>
        this.notificationService.addError(`Failed to get Proposal votes`, error)
      );
    this.communityFundService
      .fetchProposals()
      .catch(error =>
        this.notificationService.addError(`Failed to get Proposals`, error)
      );
  }

  voteForProposal(hash, vote) {
    this.buttonDebounce = true;

    this.communityFundService
      .updatePaymentRequestVote(hash, vote)
      .then(() => {
        this.notificationService.addNotification(
          new NavDroidNotification(
            `Successfully voted ${vote} for ${hash}`,
            NotifType.SUCCESS
          )
        );
      })
      .catch(error => {
        this.notificationService.addError(
          `Failed to vote ${vote} for ${hash}`,
          error
        );
      })
      .finally(() => {
        this.buttonDebounce = false;
      });
  }
}
