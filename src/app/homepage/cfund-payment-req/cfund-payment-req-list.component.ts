import { Component, OnInit } from '@angular/core';

import { WalletModel } from '../../wallet/wallet.model';
import { WalletService } from '../../wallet/wallet.service';
import { RpcSend } from '../../rpc/rpc-send.model';
import { RpcReceive } from '../../rpc/rpc-receive.model';

@Component({
  selector: 'app-cfund-payment-req-list',
  templateUrl: './cfund-payment-req-list.html',
  styleUrls: ['../homepage.component.css', './cfund-payment-req-list.css']
})
export class CFundPaymentRequestListComponent implements OnInit {
  wallet: WalletModel;

  rpcSend: RpcSend;
  rpcReceive: RpcReceive;
  qrMainAddress: string;

  constructor(private walletService: WalletService) {}

  ngOnInit() {}
}
