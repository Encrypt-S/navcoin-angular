import { Component, OnInit } from '@angular/core';

import { MzToastService } from 'ngx-materialize';
import { WalletService } from 'src/app/wallet/wallet.service';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';
import { FormControl, FormGroup } from '@angular/forms';
import { RpcSend } from 'src/app/rpc/rpc-send.model';

@Component({
  selector: 'app-change-wallet-password',
  templateUrl: './change-wallet-password.component.html'
})
export class ChangeWalletPasswordComponent implements OnInit {
  buttonDebounce = false;
  passwordForm = new FormGroup({
    currentPass: new FormControl(''),
    newPass: new FormControl(''),
    confirmNewPass: new FormControl('')
  });

  constructor(
    private walletService: WalletService,
    private toastService: MzToastService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (
      this.passwordForm.value.newPass !== this.passwordForm.value.confirmNewPass
    ) {
      this.toastService.show(
        'New wallet password does not match the confirm field.',
        5000,
        'red'
      );
      this.buttonDebounce = false;
      return;
    }
    this.buttonDebounce = true;
    this.toastService.show(
      'Wallet password is updating, please wait',
      10000,
      'green'
    );
    this.walletService
      .sendRPC(
        new RpcSend('walletpassphrasechange', [
          this.passwordForm.value.currentPass,
          this.passwordForm.value.newPass
        ])
      )
      .subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            this.toastService.show(
              'Wallet password successfully updated, please restart your Stakebox to begin using your encrypted wallet.',
              10000,
              'green'
            );
            this.passwordForm.reset();
          } else {
            this.toastService.show(
              'Failed to update wallet password.',
              5000,
              'red'
            );
          }
          this.buttonDebounce = false;
        },
        error => {
          this.toastService.show(
            'Failed to update wallet password.',
            5000,
            'red'
          );
          this.buttonDebounce = false;
        }
      );
  }
}
