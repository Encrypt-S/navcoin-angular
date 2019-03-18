import { Component, OnInit } from '@angular/core';
import { NavDroidNotification, NotifType } from './NavDroidNotification.model';
import { NotificationService } from './notification.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { WalletService } from '../wallet/wallet.service';
import { RpcReceive } from '../rpc/rpc-receive.model';
import { RpcSend } from '../rpc/rpc-send.model';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css']
})
export class NotificationBarComponent implements OnInit {
  notifTypes = NotifType;
  authed: Boolean;
  dataRefresher: Subscription;

  constructor(
    public notificationService: NotificationService,
    public walletService: WalletService,
    public auth: AuthService,
    public router: Router
  ) {
    router.events.subscribe(val => {
      if (!this.auth.isAuthenticated()) {
        this.authed = false;
      } else {
        this.authed = true;
      }
    });
  }

  ngOnInit() {
    this.getEncryptionStatus();
  }

  getEncryptionStatus() {
    this.walletService.sendRPC(new RpcSend('help')).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          if (receive.data.indexOf('walletlock') === -1) {
            this.notificationService.addWarning(
              `Your wallet is not encrypted, please use the 'Encrypt Wallet' button on the overview page to secure your wallet.`
            );
          }
        } else {
          this.notificationService.addError(
            `${receive.message} ${receive.code}`,
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
  removeNotification(targetNotif: NavDroidNotification): void {
    this.notificationService.removeNotification(targetNotif);
  }
}
