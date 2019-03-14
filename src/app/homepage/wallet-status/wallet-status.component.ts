import { Component, OnInit } from '@angular/core';
import { WalletOverview } from './WalletOverview.model';
import { WalletService } from '../../wallet/wallet.service';
import { RpcSend } from '../../rpc/rpc-send.model';
import { RpcReceive } from '../../rpc/rpc-receive.model';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import {
  NotifType,
  NavDroidNotification
} from 'src/app/notification-bar/NavDroidNotification.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-wallet-status',
  templateUrl: './wallet-status.component.html',
  styleUrls: ['../homepage.component.css', './wallet-status.component.css']
})
export class WalletStatusComponent implements OnInit {
  wallet: WalletOverview;
  rpcReceive: RpcReceive;
  dataRefresher: Subscription;

  buttonDebounce: Boolean = false;

  passwordForm = new FormGroup(
    {
      password: new FormControl('', Validators.minLength(10)),
      passwordConfirm: new FormControl('', Validators.minLength(10))
    },
    this.passwordMatchValidator
  );

  unlockForm = new FormGroup({
    unlockPassword: new FormControl('', Validators.minLength(10)),
    unlockTime: new FormControl('')
  });

  stakingForm = new FormGroup({
    stakingPassword: new FormControl('', Validators.minLength(10))
  });

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
      ? null
      : { mismatch: true };
  }

  constructor(
    private walletService: WalletService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getWalletOverview();
    this.dataRefresher = Observable.interval(30000).subscribe(val => {
      this.getWalletOverview();
    });
  }

  getWalletOverview() {
    this.walletService.sendAPI('get-wallet-overview', {}).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this.wallet = {
            currentBlock: receive.data.currentBlock,
            isLocked: receive.data.isLocked,
            isStaking: receive.data.isStaking,
            isSyncing: receive.data.isSyncing,
            walletChain: receive.data.walletChain,
            walletVersion: receive.data.walletVersion,
            isEncrypted: receive.data.isEncrypted,
            isUnlockedForStaking: receive.data.isUnlockedForStaking
          };
        } else {
          this.notificationService.addError(
            `${receive.message} ${receive.code} ${[...receive.data]}`,
            'Unable to get wallet overview data'
          );
        }
      },
      error => {
        this.notificationService.addError(
          error,
          'Unable to get wallet overview data'
        );
      }
    );
  }

  setLocked(lockWallet: Boolean) {
    this.buttonDebounce = true;

    let command: RpcSend;
    if (lockWallet) {
      command = new RpcSend('walletlock');
    } else {
      command = new RpcSend('walletpassphrase', [
        this.unlockForm.value.unlockPassword,
        this.unlockForm.value.unlockTime
      ]);
    }

    this.walletService.sendRPC(command).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          if (lockWallet) {
            this.notificationService.addNotification(
              new NavDroidNotification(
                'Wallet is now locked',
                NotifType.SUCCESS
              )
            );
          } else {
            this.wallet.isLocked = false;
            this.notificationService.addNotification(
              new NavDroidNotification(
                `Wallet is now unlocked, it will lock itself in ${
                  this.unlockForm.value.unlockTime
                } seconds`,
                NotifType.WARNING
              )
            );
          }
        } else {
          this.notificationService.addNotification(
            new NavDroidNotification(
              `Wallet lock/unlock failed: ${receive.message}, ${JSON.stringify(
                receive.data
              )}`,
              NotifType.ERROR
            )
          );
        }
        this.buttonDebounce = false;
      },
      error => {
        this.notificationService.addNotification(
          new NavDroidNotification(
            `Wallet lock/unlock failed: ${error}`,
            NotifType.ERROR
          )
        );
        this.buttonDebounce = false;
      }
    );
  }

  setStaking(setStaking: Boolean) {
    this.buttonDebounce = true;

    let command;

    if (this.wallet.isEncrypted && setStaking) {
      command = [
        new RpcSend('walletpassphrase', [
          this.stakingForm.value.stakingPassword,
          999999999999999999,
          true
        ]),
        new RpcSend('staking', [setStaking])
      ];
    } else {
      command = [new RpcSend('staking', [setStaking])];
    }

    this.walletService.sendBatchRPC(command).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          if (setStaking) {
            this.notificationService.addNotification(
              new NavDroidNotification(
                'Wallet is now staking',
                NotifType.SUCCESS
              )
            );
            this.wallet.isStaking = true;
            if (this.wallet.isEncrypted) {
              this.wallet.isUnlockedForStaking = true;
            }
          } else {
            this.notificationService.addNotification(
              new NavDroidNotification(
                'Wallet is no longer staking',
                NotifType.SUCCESS
              )
            );
          }
          this.wallet.isStaking = false;
        } else {
          this.notificationService.addNotification(
            new NavDroidNotification(
              `Turning Staking on/off failed: ${JSON.stringify(
                receive.message
              )}, ${receive.data}`,
              NotifType.ERROR
            )
          );
        }
        this.buttonDebounce = false;
      },
      error => {
        this.notificationService.addError(
          error,
          `Turning Staking on/off failed`
        );
        this.buttonDebounce = false;
      }
    );
  }

  encryptWallet() {
    this.buttonDebounce = true;
    this.walletService
      .sendRPC(new RpcSend('encryptwallet', [this.passwordForm.value.password]))
      .subscribe(
        (receive: RpcReceive) => {
          this.notificationService.addNotification(
            new NavDroidNotification(
              'Wallet successfully encrypted, please restart your Stakebox to begin using your encrypted wallet.',
              NotifType.SUCCESS
            )
          );
          this.buttonDebounce = false;
        },
        error => {
          this.notificationService.addError(error, 'Failed to encrypt wallet');
          this.buttonDebounce = false;
        }
      );
  }
}
