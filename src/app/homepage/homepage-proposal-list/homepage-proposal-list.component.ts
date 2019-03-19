import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import { CommunityFundService } from 'src/app/services/community-fund.service';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import {
  NavDroidNotification,
  NotifType
} from 'src/app/notification-bar/NavDroidNotification.model';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-homepage-proposal-list',
  templateUrl: './homepage-proposal-list.component.html',
  styleUrls: [
    '../homepage.component.css',
    './homepage-proposal-list.component.css'
  ]
})
export class HomepageProposalListComponent implements OnInit, OnDestroy {
  constructor(
    public communityFundService: CommunityFundService,
    private toastService: MzToastService,
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

  ngOnDestroy() {
    this.dataRefresher.unsubscribe();
  }

  getData() {
    console.log('HomepageProposalListComponent fetching new Proposal data');
    this.communityFundService
      .fetchProposalVotes()
      .catch(error =>
        this.notificationService.addError(error, `Failed to get Proposal votes`)
      );
    this.communityFundService
      .fetchProposals()
      .catch(error =>
        this.notificationService.addError(error, `Failed to get Proposals`)
      );
  }

  voteForProposal(hash, vote) {
    this.buttonDebounce = true;

    this.communityFundService
      .updateProposalVote(hash, vote)
      .then(() => {
        this.toastService.show(
          `Successfully updated vote for ${hash}`,
          4000,
          'green'
        );
        this.getData();
      })
      .catch(error => {
        this.toastService.show(
          `Failed to updated vote for ${hash}`,
          4000,
          'red'
        );
      })
      .finally(() => {
        this.buttonDebounce = false;
      });
  }
}
