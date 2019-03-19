import { Component, OnInit } from '@angular/core';

import { WalletUtilsModel } from './wallet-utils.model';
import { WalletUtilsResponse } from './wallet-utils.response.model';
import { WalletUtilsService } from './wallet-utils.service';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-wallet-utils',
  templateUrl: './wallet-utils.component.html',
  styleUrls: ['./wallet-utils.component.css']
})
export class WalletUtilsComponent implements OnInit {

  walletUtils = new WalletUtilsModel();
  walletUtilsResponse: WalletUtilsResponse;

  constructor(
    private walletUtilsService: WalletUtilsService,
    private toastService: MzToastService
  ) { }

  ngOnInit() { }

  onSubmitUpdate() {

    this.walletUtilsService.update(this.walletUtils).subscribe(
      (response: WalletUtilsResponse) => {
        if (response.type != 'SUCCESS') {
          this.toastService.show(
            response.message,
            4000,
            'red'
          );
          return;
        }

        this.walletUtils = new WalletUtilsModel();
        this.toastService.show('Daemon Updated', 4000, 'green');
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
      }
    );
  }

  onSubmitBackup() {

    this.walletUtilsService.backup(this.walletUtils).subscribe(
      (response: WalletUtilsResponse) => {
        if (response.type != 'SUCCESS') {
          this.toastService.show(
            response.message,
            4000,
            'red'
          );
          return;
        }

        this.walletUtils = new WalletUtilsModel();
        this.toastService.show('Wallet Backup Complete', 4000, 'green');
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
      }
    );
  }

  onSubmitImport() {

    this.walletUtilsService.import(this.walletUtils).subscribe(
      (response: WalletUtilsResponse) => {
        if (response.type != 'SUCCESS') {
          this.toastService.show(
            response.message,
            4000,
            'red'
          );
          return;
        }

        this.walletUtils = new WalletUtilsModel();
        this.toastService.show('Wallet Import Complete', 4000, 'green');
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
      }
    );
  }

}
