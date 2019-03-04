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
    this.getData();

    this.dataRefresher = Observable.interval(30000).subscribe(val => {
      this.getData();
    });
  }

  getData() {
    console.log(
      'HomepagePaymentRequestListComponent fetching new Proposal data'
    );
    this.communityFundService
      .fetchPaymentRequestVotes()
      .catch(error =>
        this.notificationService.addError(
          `Failed to get PaymentRequest votes`,
          error
        )
      );
    this.communityFundService
      .fetchPaymentRequests()
      .catch(error =>
        this.notificationService.addError(
          `Failed to get PaymentRequests`,
          error
        )
      );
  }

  voteForPaymentRequest(hash, vote) {
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
        this.getData();
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
