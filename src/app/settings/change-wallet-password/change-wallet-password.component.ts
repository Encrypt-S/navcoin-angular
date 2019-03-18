import { Component, OnInit } from '@angular/core';

import { MzToastService } from 'ngx-materialize';
import { WalletService } from 'src/app/wallet/wallet.service';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-wallet-password',
  templateUrl: './change-wallet-password.component.html'
})
export class ChangeWalletPasswordComponent implements OnInit {
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

  onSubmit() {}
}
