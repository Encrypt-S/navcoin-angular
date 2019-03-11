import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/wallet/wallet.service';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';
import { RpcSend } from 'src/app/rpc/rpc-send.model';
import {
  NavDroidNotification,
  NotifType
} from 'src/app/notification-bar/NavDroidNotification.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-config-edit',
  templateUrl: './config-edit.component.html',
  styleUrls: ['./config-edit.component.css']
})
export class ConfigEditComponent implements OnInit {
  originalConfig: string;

  configForm = new FormGroup({
    config: new FormControl('')
  });

  constructor(
    private walletService: WalletService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getConfig();
  }

  resetConfig() {
    this.configForm.setValue({ config: this.originalConfig });
  }
  getConfig() {
    this.walletService.sendAPI('get-wallet-config').subscribe(
      (response: RpcReceive) => {
        if (response.type === 'SUCCESS') {
          this.originalConfig = response.data.config;
          this.configForm.setValue({ config: this.originalConfig });

          return;
        } else {
          this.notificationService.addError(
            `${response.message} ${response.code} ${[...response.data]}`,
            `Failed to get wallet config`
          );
        }
      },
      error => {
        console.log('error: ', error);
        this.notificationService.addError(error, `Failed to get wallet config`);
      }
    );
  }

  onSubmit() {
    this.walletService
      .sendAPI('update-wallet-config', { config: this.configForm.value.config })
      .subscribe(
        (response: RpcReceive) => {
          if (response.type === 'SUCCESS') {
            this.notificationService.addNotification(
              new NavDroidNotification(
                `NavCoin config successfully updated, please restart your Stakebox`,
                NotifType.SUCCESS
              )
            );
            this.originalConfig = this.configForm.value.config;
            return;
          } else {
            this.notificationService.addError(
              `${response.message} ${response.code} ${[...response.data]}`,
              `Failed to update your config`
            );
          }
        },
        error => {
          console.log('error: ', error);
          this.notificationService.addError(
            error,
            `Failed to update your config`
          );
        }
      );
  }
}
