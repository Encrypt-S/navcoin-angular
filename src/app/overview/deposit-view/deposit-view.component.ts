import { Component, OnInit } from '@angular/core';
import { ExplorerService } from '../../explorer/explorer.service';
import { WalletModel } from '../../wallet/wallet.model';
import { WalletService } from '../../wallet/wallet.service';
import { RpcReceive } from '../../rpc/rpc-receive.model';
import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import {
  Notification,
  NotifType
} from 'src/app/notification-bar/notification.model';

@Component({
  selector: 'app-deposit-view',
  templateUrl: './deposit-view.component.html',
  styleUrls: ['../overview.component.css', './deposit-view.component.css']
})
export class DepositViewComponent implements OnInit {
  wallet: WalletModel;
  rpcReceive: RpcReceive;

  qrMainAddress: string;
  mainAddress: string;

  constructor(
    private walletService: WalletService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getMainAddress();
  }

  getMainAddress() {
    this.walletService.sendAPI('getmainaddress').subscribe(
      (receieve: RpcReceive) => {
        this.mainAddress = receieve.data.address;
        this.qrMainAddress = `navcoin:${this.mainAddress}?label=NavPi`;
      },
      error => {
        this.notificationService.addNotification(
          new Notification(
            `Unable to get new address ${error}`,
            NotifType.ERROR
          )
        );
        return;
      }
    );
  }

  getNewAddress() {
    const data = new RpcSend('getnewaddress');
    this.walletService.sendRPC(data).subscribe((receive: RpcReceive) => {
      const address = receive.data;
      this.qrMainAddress = `navcoin${address}?label=NavPi`;
    });
  }
}
