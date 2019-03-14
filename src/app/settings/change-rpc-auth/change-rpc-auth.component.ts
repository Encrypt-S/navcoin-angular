import { Component, OnInit } from '@angular/core';

import { MzToastService } from 'ngx-materialize';
import { WalletService } from 'src/app/wallet/wallet.service';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-rpc-auth',
  templateUrl: './change-rpc-auth.component.html'
})
export class ChangeRPCAuthComponent implements OnInit {
  rpcForm = new FormGroup({
    currentUser: new FormControl(''),
    currentPass: new FormControl(''),
    newUser: new FormControl(''),
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
