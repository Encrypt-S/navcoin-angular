import { Component, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import { CommunityFundService } from 'src/app/services/community-fund.service';
import {
  NotifType,
  NavDroidNotification
} from 'src/app/notification-bar/NavDroidNotification.model';
import { NotificationService } from 'src/app/notification-bar/notification.service';

@Component({
  selector: 'app-homepage-payment-request-list',
  templateUrl: './homepage-payment-request-list.html',
  styleUrls: [
    '../homepage.component.css',
    './homepage-payment-request-list.css'
  ]
})
export class HomepagePaymentRequestListComponent implements OnInit {
  buttonDebounce: Boolean = false;
  dataRefresher: Subscription;

  constructor(
    public communityFundService: CommunityFundService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    console.log(
      'HomepagePaymentRequestListComponent fetching new Proposal data'
    );
    this.communityFundService.fetchPaymentRequestVotes();
    this.communityFundService.fetchPaymentRequests();

    this.dataRefresher = Observable.interval(30000).subscribe(val => {
      console.log(
        'HomepagePaymentRequestListComponent fetching new Proposal data'
      );
      this.communityFundService.fetchPaymentRequestVotes();
      this.communityFundService.fetchPaymentRequests();
    });
  }

  vote(hash, vote) {
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
        this.communityFundService.fetchPaymentRequestVotes();
      })
      .catch(error => {
        this.notificationService.addNotification(
          new NavDroidNotification(
            `Failed to vote ${vote} for ${hash} : ${error}`,
            NotifType.ERROR
          )
        );
      })
      .finally(() => {
        this.buttonDebounce = false;
      });
  }
}
