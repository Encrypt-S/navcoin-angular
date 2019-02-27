import { Component, OnInit } from '@angular/core';
import { WalletOverview } from './WalletOverview.model';
import { WalletService } from '../../wallet/wallet.service';
import { RpcSend } from '../../rpc/rpc-send.model';
import { RpcReceive } from '../../rpc/rpc-receive.model';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import {
  NotifType,
  Notification
} from 'src/app/notification-bar/notification.model';

@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: ['../homepage.component.css', './status-view.component.css']
})
export class StatusViewComponent implements OnInit {
  wallet: WalletOverview;
  rpcReceive: RpcReceive;

  constructor(
    private walletService: WalletService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getWalletOverview();
  }

  getWalletOverview() {
    this.walletService.sendAPI('walletoverview', {}).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this.wallet = {
            currentBlock: receive.data.currentBlock,
            highestKnownBlock: receive.data.highestKnownBlock,
            isLocked: receive.data.isLocked,
            isStaking: receive.data.isStaking,
            isSyncing: receive.data.isSyncing,
            walletChain: receive.data.walletChain,
            walletVersion: receive.data.walletVersion,
            isEncrypted: receive.data.isEncrypted
          };
        } else {
          console.log('error: ', receive);
        }
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  setLocked(lockWallet: Boolean) {
    let command: RpcSend;
    if (lockWallet) {
      command = new RpcSend('walletlock');
    } else {
      command = new RpcSend('walletpassphrase', ['60']);
    }

    this.walletService.sendRPC(command).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          if (lockWallet) {
            this.notificationService.addNotification(
              new Notification('Wallet is now locked', NotifType.SUCCESS)
            );
          } else {
            this.notificationService.addNotification(
              new Notification('Wallet is now unlocked', NotifType.WARNING)
            );
          }
        } else {
          this.notificationService.addNotification(
            new Notification(
              `Wallet lock/unlock failed: ${receive.message}, ${receive.data}`,
              NotifType.ERROR
            )
          );
        }
      },
      error => {
        this.notificationService.addNotification(
          new Notification(
            `Wallet lock/unlock failed: ${error}`,
            NotifType.ERROR
          )
        );
      }
    );
  }

  setStaking(setStaking: Boolean) {
    if (this.wallet.isEncrypted) {
      this.notificationService.addNotification(
        new Notification(
          'Changing staking status while the wallet is encrypted is not currently supported',
          NotifType.WARNING
        )
      );
      return;
    }

    const command = new RpcSend('staking', [setStaking]);

    this.walletService.sendRPC(command).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          if (setStaking) {
            this.notificationService.addNotification(
              new Notification('Wallet is now staking', NotifType.SUCCESS)
            );
          } else {
            this.notificationService.addNotification(
              new Notification('Wallet is no longer staking', NotifType.SUCCESS)
            );
          }
          this.wallet.isStaking = setStaking;
        } else {
          this.notificationService.addNotification(
            new Notification(
              `Turning Staking on/off failed: ${receive.message}, ${
                receive.data
              }`,
              NotifType.ERROR
            )
          );
        }
      },
      error => {
        this.notificationService.addNotification(
          new Notification(
            `Turning Staking on/off failed: ${error}`,
            NotifType.ERROR
          )
        );
      }
    );
  }
  encryptWallet() {
    this.notificationService.addNotification(
      new Notification(
        'This function is not currently implemented',
        NotifType.WARNING
      )
    );
  }
}
