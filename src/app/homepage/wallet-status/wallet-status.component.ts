import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-wallet-status',
  templateUrl: './wallet-status.component.html',
  styleUrls: ['../homepage.component.css', './wallet-status.component.css']
})
export class WalletStatusComponent implements OnInit, OnDestroy {
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
    private notificationService: NotificationService,
    private toastService: MzToastService
  ) {}

  ngOnInit() {
    this.getWalletOverview();
    this.dataRefresher = Observable.interval(30000).subscribe(val => {
      this.getWalletOverview();
    });
  }

  ngOnDestroy() {
    this.dataRefresher.unsubscribe();
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

  setStaking(setStaking: Boolean) {
    this.buttonDebounce = true;

    let command: Array<RpcSend>;

    if (this.wallet.isEncrypted && setStaking) {
      command = [
        new RpcSend('walletpassphrase', [
          'this.stakingForm.value.stakingPassword',
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
            this.toastService.show('Wallet is now staking', 4000, 'green');
            this.wallet.isStaking = true;
            if (this.wallet.isEncrypted) {
              this.wallet.isUnlockedForStaking = true;
            }
          } else {
            this.toastService.show(
              'Wallet is no longer staking',
              4000,
              'green'
            );
            this.wallet.isStaking = false;
          }
        } else {
          this.notificationService.addError(
            `${JSON.stringify(receive.message)}, ${receive.data}`,
            `Turning Staking on/off failed`
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
    this.toastService.show('Wallet is encrypting, please wait', 10000, 'green');

    this.walletService
      .sendRPC(new RpcSend('encryptwallet', [this.passwordForm.value.password]))
      .subscribe(
        (receive: RpcReceive) => {
          this.toastService.show(
            'Wallet successfully encrypted, please restart your Stakebox to begin using your encrypted wallet.',
            10000,
            'green'
          );
          this.buttonDebounce = false;
        },
        error => {
          this.toastService.show('Failed to encrypt wallet.', 5000, 'red');
          this.notificationService.addError(error, 'Failed to encrypt wallet');
          this.buttonDebounce = false;
        }
      );
  }
}
