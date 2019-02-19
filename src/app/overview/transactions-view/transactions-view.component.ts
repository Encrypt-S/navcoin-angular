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
  selector: 'app-transactions-view',
  templateUrl: './transactions-view.component.html',
  styleUrls: ['../overview.component.css','./transactions-view.component.css']
})
export class TransactionsViewComponent implements OnInit {

  explorer: ExplorerModel;
  wallet: WalletModel;
  transaction: SendToAddressModel = {
    amount: undefined,
    destinationAddress: undefined,
    feeIncluded: false,
  };
  rpcReceive: RpcReceive;
  qrMainAddress: string;

  constructor(
    private explorerService: ExplorerService,
    private walletService: WalletService
  ) {}

  ngOnInit() {};
}
