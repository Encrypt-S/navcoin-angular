import { Component, OnInit } from '@angular/core';
import { WalletModel } from '../../wallet/wallet.model';
import { WalletService } from '../../wallet/wallet.service';
import { RpcReceive } from '../../rpc/rpc-receive.model';
import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import {
  NavDroidNotification,
  NotifType
} from 'src/app/notification-bar/NavDroidNotification.model';

@Component({
  selector: 'app-deposit-view',
  templateUrl: './deposit-view.component.html',
  styleUrls: ['../homepage.component.css', './deposit-view.component.css']
})
export class DepositViewComponent implements OnInit {
  wallet: WalletModel;
  rpcReceive: RpcReceive;

  qrCodeString: string;
  mainAddress: string;
  displayAddress: string;

  constructor(
    private walletService: WalletService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getMainAddress();
  }

  getMainAddress() {
    this.walletService.sendAPI('get-main-address').subscribe(
      (receieve: RpcReceive) => {
        if (receieve.type === 'SUCCESS') {
          this.mainAddress = receieve.data.address;
          this.displayAddress = receieve.data.address;
          this.qrCodeString = `navcoin:${this.mainAddress}?label=NavPi`;
        } else if (receieve.type === 'WARN' && receieve.code === 'ADR_004') {
          this.displayAddress = receieve.data;
          this.qrCodeString = `navcoin:${this.displayAddress}?label=NavPi`;
          this.notificationService.addWarning(receieve.message, '/settings');
        } else {
          if (receieve.code === 'ADR_006') {
            this.notificationService.addError(
              receieve.data,
              receieve.message,
              '/settings'
            );
          } else {
            this.notificationService.addError(receieve.data, receieve.message);
          }
        }
      },
      error => {
        this.notificationService.addError(error, `Unable to get main address`);
        return;
      }
    );
  }

  getNewAddress() {
    const data = new RpcSend('getnewaddress');
    this.walletService.sendRPC(data).subscribe(
      (receive: RpcReceive) => {
        const newAddress = receive.data;
        this.displayAddress = newAddress;
        this.qrCodeString = `navcoin${newAddress}?label=NavPi`;
      },
      error => {
        this.notificationService.addError(
          error,
          'Failed to get a new address from the RPC'
        );
      }
    );
  }
}
