import { Component, OnInit } from '@angular/core';

import { WalletModel } from '../../wallet/wallet.model';
import { WalletService } from '../../wallet/wallet.service';
import { RpcSend } from '../../rpc/rpc-send.model';
import { RpcReceive } from '../../rpc/rpc-receive.model';

export interface SendToAddressModel {
  amount: Number;
  destinationAddress: String;
  feeIncluded: Boolean;
}

@Component({
  selector: 'cfund-payment-req-list',
  templateUrl: './cfund-payment-req-list.html',
  styleUrls: ['../overview.component.css', './cfund-payment-req-list.css']
})
export class CFundPaymentRequestListComponent implements OnInit {

  wallet: WalletModel;
  transaction: SendToAddressModel = {
    amount: undefined,
    destinationAddress: undefined,
    feeIncluded: false,
  };
  rpcSend: RpcSend;
  rpcReceive: RpcReceive;
  qrMainAddress: string;

  constructor(
    private walletService: WalletService
  ) {}

  ngOnInit() {
  }
}
