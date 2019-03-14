import { Component, OnInit } from '@angular/core';
import { ExplorerService } from '../../explorer/explorer.service';
import { WalletModel } from '../../wallet/wallet.model';
import { WalletService } from '../../wallet/wallet.service';
import { RpcSend } from '../../rpc/rpc-send.model';
import { RpcReceive } from '../../rpc/rpc-receive.model';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import {
  NavDroidNotification,
  NotifType
} from 'src/app/notification-bar/NavDroidNotification.model';

export interface SendToAddressModel {
  amount: Number;
  destinationAddress: String;
  feeIncluded: Boolean;
}

@Component({
  selector: 'app-send-to-view',
  templateUrl: './send-to-view.component.html',
  styleUrls: ['../homepage.component.css', './send-to-view.component.css']
})
export class SendToViewComponent implements OnInit {
  wallet: WalletModel;
  transaction: SendToAddressModel = {
    amount: undefined,
    destinationAddress: undefined,
    feeIncluded: false
  };
  buttonDebounce: Boolean = false;
  isEncrypted: Boolean;
  rpcReceive: RpcReceive;

  passwordForm = new FormGroup({
    password: new FormControl('')
  });

  constructor(
    private walletService: WalletService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.walletService.sendAPI('get-wallet-overview', {}).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this.isEncrypted = receive.data;
        } else {
          this.notificationService.addError(
            `${receive.message} ${receive.code} ${[...receive.data]}`,
            'SendToViewComponent was unable to check if your wallet is encrypted'
          );
          this.isEncrypted = false;
        }
      },
      error => {
        this.notificationService.addError(
          error,
          'SendToViewComponent was unable to check if your wallet is encrypted'
        );
        this.isEncrypted = false;
      }
    );
  }

  sendToAddress(destinationAddress, amount, feeIncluded) {
    this.buttonDebounce = true;

    if (this.isEncrypted) {
      // unlock the wallet if we must
      const rpcData = new RpcSend('walletpassphrase', [
        `${this.passwordForm.value.password}`,
        30
      ]);
      this.walletService.sendRPC(rpcData).subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            this.notificationService.addNotification(
              new NavDroidNotification(
                `Wallet unlocked, preparing to send`,
                NotifType.SUCCESS
              )
            );
            this.sendCoins(destinationAddress, amount, feeIncluded);
          } else {
            this.notificationService.addError(
              receive.data,
              'Failed to unlock wallet to send coins'
            );
            this.buttonDebounce = false;
          }
        },
        error => {
          console.log('error: ', error);
          this.notificationService.addError(
            error,
            'Failed to unlock wallet to send coins'
          );
          this.buttonDebounce = false;
        }
      );
    } else {
      this.sendCoins(destinationAddress, amount, feeIncluded);
    }
  }

  sendCoins(destinationAddress, amount, feeIncluded) {
    const rpcData = new RpcSend('sendtoaddress', [
      destinationAddress,
      amount.toString(),
      feeIncluded.toString()
    ]);

    this.walletService.sendRPC(rpcData).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this.buttonDebounce = false;
          this.notificationService.addNotification(
            new NavDroidNotification(`Sent`, NotifType.SUCCESS)
          );
        } else {
          this.notificationService.addError(
            receive.data,
            'Failed to send coins'
          );
          this.buttonDebounce = false;
        }
      },
      error => {
        this.notificationService.addError(error, 'Failed to send coins');
        this.buttonDebounce = false;
      }
    );
  }
}
