import { Component, OnInit } from '@angular/core';
import { ExplorerService } from '../../explorer/explorer.service';
import { WalletModel } from '../../wallet/wallet.model';
import { WalletService } from '../../wallet/wallet.service';
import { RpcSend } from '../../rpc/rpc-send.model';
import { RpcReceive } from '../../rpc/rpc-receive.model';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import {
  NavDroidNotification,
  NotifType
} from 'src/app/notification-bar/NavDroidNotification.model';

@Component({
  selector: 'app-set-main-address',
  templateUrl: './set-main-address.component.html',
  styleUrls: ['./set-main-address.component.css']
})
export class SetMainAddressComponent implements OnInit {
  wallet: WalletModel;
  rpcReceive: RpcReceive;
  newAddress: string;
  buttonDebounce: Boolean = false;

  constructor(
    private walletService: WalletService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  updateAddress(newAddress) {
    this.buttonDebounce = true;
    this.walletService
      .sendAPI('set-main-address', { address: newAddress })
      .subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            this.notificationService.addNotification(
              new NavDroidNotification(`${receive.data}`, NotifType.SUCCESS)
            );
          } else {
            this.notificationService.addError(receive.data, receive.message);
          }
          this.buttonDebounce = false;
        },
        error => {
          this.notificationService.addError(
            error,
            'Unable to update main address'
          );
          this.buttonDebounce = false;
        }
      );
  }

  generateNewAddress() {
    this.buttonDebounce = true;

    this.walletService.sendAPI('generate-main-address').subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this.notificationService.addNotification(
            new NavDroidNotification(`${receive.data}`, NotifType.SUCCESS)
          );
        } else {
          this.notificationService.addError(receive.data, receive.message);
        }
        this.buttonDebounce = false;
      },
      error => {
        this.notificationService.addError(
          error,
          'Unable to update main address'
        );
        this.buttonDebounce = false;
      }
    );
  }
}
