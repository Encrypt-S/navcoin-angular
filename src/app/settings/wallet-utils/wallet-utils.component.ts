import { Component, OnInit } from '@angular/core';

import { WalletUtilsModel } from './wallet-utils.model';
import { WalletUtilsResponse } from './wallet-utils.response.model';
import { WalletUtilsService } from './wallet-utils.service';
import { MzToastService } from 'ngx-materialize';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import {
  NavDroidNotification,
  NotifType
} from 'src/app/notification-bar/NavDroidNotification.model';

import { saveAs } from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-wallet-utils',
  templateUrl: './wallet-utils.component.html',
  styleUrls: ['./wallet-utils.component.css']
})
export class WalletUtilsComponent implements OnInit {

  walletUtils = new WalletUtilsModel();
  walletUtilsResponse: WalletUtilsResponse;
  disableUpdateButton = false;
  disableRestartButton = false;
  disableBackupButton = false;
  disableImportButton = false;
  loginRedirect;

  constructor(
    private walletUtilsService: WalletUtilsService,
    private notificationService: NotificationService,
    private toastService: MzToastService
  ) { }

  ngOnInit() {
    const url = window.location.href;
    const parts = url.split(':');
    this.loginRedirect = parts[0] + ':' + parts[1] + '/login';
  }

  onSubmitUpdate() {
    this.disableUpdateButton = true;
    this.toastService.show(
      'NavCoin is attempting to update, please be patient',
      4000,
      'green'
    );
    this.walletUtilsService.update(this.walletUtils).subscribe(
      (response: WalletUtilsResponse) => {
        if (response.type != 'SUCCESS') {
          this.toastService.show(
            response.message,
            4000,
            'red'
          );
          this.disableUpdateButton = false;
          return;
        }
        this.walletUtils = new WalletUtilsModel();
        if (response.data.code == 3) {
          this.toastService.show(
            response.message,
            4000,
            'green'
          );
          this.disableUpdateButton = false;
          return;
        }

        const newNotif = new NavDroidNotification(
          'The web service is now restarting, please reauthenticate in a few minutes.',
          NotifType.SUCCESS,
          this.loginRedirect
        );
        this.notificationService.addNotification(newNotif);
        return;
      },
      error => {
        console.log('error: ', error, 'TEST_003A');
        this.walletUtils = new WalletUtilsModel();
        this.toastService.show(
          error.error.message,
          4000,
          'red'
        );
        this.disableUpdateButton = false;
      }
    );
  }

  onSubmitRestart() {
    this.disableRestartButton = true;
    this.walletUtilsService.restart(this.walletUtils).subscribe(
      (response: WalletUtilsResponse) => {
        if (response.type != 'SUCCESS') {
          this.toastService.show(
            response.message,
            4000,
            'red'
          );
          this.disableRestartButton = false;
          return;
        }

        this.walletUtils = new WalletUtilsModel();
        const newNotif = new NavDroidNotification(
          'NavCoin is now restarting, please refresh the page in a few minutes.',
          NotifType.SUCCESS,
        );
        this.notificationService.addNotification(newNotif);
        return;
      },
      error => {
        console.log('error: ', error);
        this.walletUtils = new WalletUtilsModel();
        this.toastService.show(
          error.error.message,
          4000,
          'red'
        );
        this.disableRestartButton = false;
      }
    );
  }

  onSubmitBackup() {
    this.disableBackupButton = true;
    this.walletUtilsService.backup(this.walletUtils).subscribe(
      (data) => {

        let today = moment().format('YYYY-MM-DD');
        saveAs(data, today+'-wallet.dat');

        this.walletUtils = new WalletUtilsModel();
        this.toastService.show('Wallet Backup Complete', 4000, 'green');
        this.disableBackupButton = false;
        return;
      },
      error => {
        console.log('error: ', error);
        this.walletUtils = new WalletUtilsModel();
        this.toastService.show(
          error.error.message,
          4000,
          'red'
        );
        this.disableBackupButton = false;
      }
    );
  }

  onSubmitImport() {
    this.disableImportButton = true;
    this.walletUtilsService.import(this.walletUtils).subscribe(
      (response: WalletUtilsResponse) => {
        if (response.type != 'SUCCESS') {
          this.toastService.show(
            response.message,
            4000,
            'red'
          );
          this.disableImportButton = false;
          return;
        }

        this.walletUtils = new WalletUtilsModel();
        const newNotif = new NavDroidNotification(
          'NavCoin is now restarting, please refresh the page in a few minutes.',
          NotifType.SUCCESS,
        );
        this.notificationService.addNotification(newNotif);
        return;
      },
      error => {
        console.log('error: ', error);
        this.walletUtils = new WalletUtilsModel();
        this.toastService.show(
          error.error.message,
          4000,
          'red'
        );
        this.disableImportButton = false;
      }
    );
  }

}
