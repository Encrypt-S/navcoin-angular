import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommunityFundService } from 'src/app/services/community-fund.service';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import {
  NotifType,
  NavDroidNotification
} from 'src/app/notification-bar/NavDroidNotification.model';

@Component({
  selector: 'app-payment-request-creator',
  templateUrl: './payment-request-creator.component.html',
  styleUrls: ['./payment-request-creator.component.css']
})
export class PaymentRequestCreatorComponent implements OnInit {
  constructor(
    private communityFundService: CommunityFundService,
    private notificationService: NotificationService
  ) {}
  buttonDebounce: Boolean = false;
  paymentReqForm = new FormGroup({
    proposalHash: new FormControl(''),
    uniqueID: new FormControl(''),
    requestedAmount: new FormControl('')
  });

  onSubmit() {
    this.buttonDebounce = true;

    const formData = this.paymentReqForm.value;
    const arrayData = [
      formData.proposalHash,
      formData.requestedAmount,
      formData.uniqueID
    ];
    this.communityFundService
      .createPaymentRequest(arrayData)
      .then(() => {
        this.notificationService.addNotification(
          new NavDroidNotification('Payment Request created', NotifType.SUCCESS)
        );
        this.communityFundService.fetchPaymentRequests();
        this.paymentReqForm.reset();
      })
      .catch(error => {
        this.notificationService.addNotification(
          new NavDroidNotification(
            `Failed to create payment request: ${error}`,
            NotifType.ERROR
          )
        );
      })
      .finally(() => {
        this.buttonDebounce = false;
      });
  }

  ngOnInit() {}
}
