import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommunityFundService } from 'src/app/services/community-fund.service';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import { MzToastService } from 'ngx-materialize';
import { WalletService } from 'src/app/wallet/wallet.service';
import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';

@Component({
  selector: 'app-proposal-creator',
  templateUrl: './proposal-creator.component.html',
  styleUrls: ['./proposal-creator.component.css']
})
export class ProposalCreatorComponent implements OnInit {
  isEncrypted: boolean;
  walletPassword: string;

  constructor(
    private communityFundService: CommunityFundService,
    private notificationService: NotificationService,
    private toastService: MzToastService,
    private walletService: WalletService
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
    this.walletService
      .sendRPC(new RpcSend('walletpassphrase', [this.walletPassword, 100]))
      .subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            this.submitProposal(arrayData);
          } else {
            this.notificationService.addError(
              `${receive.message} ${receive.code} ${[...receive.data]}`,
              'Unable to unlock wallet'
            );
            this.buttonDebounce = false;
            this.walletPassword = undefined;
          }
        },
        error => {
          this.notificationService.addError(error, 'Unable to unlock wallet');
          this.buttonDebounce = false;
          this.walletPassword = undefined;
        }
      );
  }

  submitProposal(arrayData) {
    this.communityFundService
      .createProposal(arrayData)
      .then(() => {
        this.toastService.show('Proposal created', 4000, 'green');
        this.communityFundService.fetchPaymentRequests();
        this.proposalForm.reset();
        this.walletPassword = undefined;
      })
      .catch(error => {
        this.notificationService.addError(error, `Failed to create Proposal`);
      })
      .finally(() => {
        this.buttonDebounce = false;
      });
  }

  ngOnInit() {
    this.getEncryptionStatus();
  }

  getEncryptionStatus() {
    this.walletService.sendRPC(new RpcSend('help')).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          if (receive.data.indexOf('walletlock') !== -1) {
            this.isEncrypted = true;
          } else {
            this.isEncrypted = false;
          }
        } else {
          this.notificationService.addError(
            `${receive.message} ${receive.code} ${[...receive.data]}`,
            'Unable to get wallet encryption status'
          );
        }
      },
      error => {
        this.notificationService.addError(
          error,
          'Unable to get wallet encryption status'
        );
      }
    );
  }
}
