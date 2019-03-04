import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommunityFundService } from 'src/app/services/community-fund.service';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import {
  NavDroidNotification,
  NotifType
} from 'src/app/notification-bar/NavDroidNotification.model';

@Component({
  selector: 'app-proposal-creator',
  templateUrl: './proposal-creator.component.html',
  styleUrls: ['./proposal-creator.component.css']
})
export class ProposalCreatorComponent implements OnInit {
  constructor(
    private communityFundService: CommunityFundService,
    private notificationService: NotificationService
  ) {}
  buttonDebounce: Boolean = false;
  proposalForm = new FormGroup({
    proposalDesc: new FormControl(''),
    paymentAddress: new FormControl(''),
    requestedAmount: new FormControl(''),
    duration: new FormControl(''),
    optionalFee: new FormControl('')
  });

  onSubmit() {
    this.buttonDebounce = true;
    const formData = this.proposalForm.value;
    const arrayData = [
      formData.paymentAddress,
      formData.requestedAmount,
      formData.duration,
      formData.proposalDesc
    ];
    if (formData.optionalFee !== '') {
      arrayData.push(formData.optionalFee);
    }
    this.communityFundService
      .createProposal(arrayData)
      .then(() => {
        this.notificationService.addNotification(
          new NavDroidNotification('Proposal created', NotifType.SUCCESS)
        );
        this.communityFundService.fetchPaymentRequests();
        this.proposalForm.reset();
      })
      .catch(error => {
        this.notificationService.addNotification(
          new NavDroidNotification(
            `Failed to create Proposal: ${error}`,
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
