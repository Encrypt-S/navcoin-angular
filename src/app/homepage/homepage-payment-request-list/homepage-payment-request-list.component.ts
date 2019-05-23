import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import { CommunityFundService } from 'src/app/services/community-fund.service';
import {
  NotifType,
  NavDroidNotification
} from 'src/app/notification-bar/NavDroidNotification.model';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-homepage-payment-request-list',
  templateUrl: './homepage-payment-request-list.html',
  styleUrls: [
    '../homepage.component.css',
    './homepage-payment-request-list.css'
  ]
})
export class HomepagePaymentRequestListComponent implements OnInit, OnDestroy {
  buttonDebounce: Boolean = false;
  dataRefresher: Subscription;

  constructor(
    public communityFundService: CommunityFundService,
    private notificationService: NotificationService,
    private toastService: MzToastService
  ) {}

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
    this.communityFundService
      .fetchPaymentRequestVotes()
      .catch(error =>
        this.notificationService.addError(
          error,
          `Failed to get PaymentRequest votes`
        )
      );
    this.communityFundService
      .fetchPaymentRequests()
      .catch(error =>
        this.notificationService.addError(
          error,
          `Failed to get PaymentRequests`
        )
      );
  }

  voteForPaymentRequest(hash, vote) {
    this.buttonDebounce = true;

    this.communityFundService
      .updatePaymentRequestVote(hash, vote)
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
          `Failed to update vote for ${hash}`,
          4000,
          'red'
        );
      })
      .finally(() => {
        this.buttonDebounce = false;
      });
  }
}
