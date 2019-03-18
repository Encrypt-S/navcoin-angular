import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommunityFundService } from 'src/app/services/community-fund.service';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import {
  NotifType,
  NavDroidNotification
} from 'src/app/notification-bar/NavDroidNotification.model';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-payment-request-creator',
  templateUrl: './payment-request-creator.component.html',
  styleUrls: ['./payment-request-creator.component.css']
})
export class PaymentRequestCreatorComponent implements OnInit {
  constructor(
    private communityFundService: CommunityFundService,
    private notificationService: NotificationService,
    private toastService: MzToastService
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
        this.toastService.show('Payment Request created', 4000, 'green');
        this.communityFundService.fetchPaymentRequests();
        this.paymentReqForm.reset();
      })
      .catch(error => {
        this.notificationService.addError(
          error,
          `Failed to create payment request`
        );
      })
      .finally(() => {
        this.buttonDebounce = false;
      });
  }

  ngOnInit() {}
}
