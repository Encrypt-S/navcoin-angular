import { Component, OnInit } from '@angular/core';

import { ExplorerModel } from '../explorer/explorer.model';
import { ExplorerService } from '../explorer/explorer.service';

import { WalletModel } from '../wallet/wallet.model';
import { WalletService } from '../wallet/wallet.service';
import { RpcSend } from '../rpc/rpc-send.model';
import { RpcReceive } from '../rpc/rpc-receive.model';

export interface SendToAddressModel {
  amount: Number;
  destinationAddress: String;
  feeIncluded: Boolean;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  explorer: ExplorerModel;
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
    private explorerService: ExplorerService,
    private walletService: WalletService
  ) {}

  ngOnInit() {
    this.showUSD();
    this.showBTC();
    this.showBalance();
    // this.getStakes();
    this.wallet = {
      ...this.wallet,
      mainAddress: 'NaSdzJ64o8DQo5DMPexVrL4PYFCBZqcmsW'
    };
    this.qrMainAddress = `navcoin:${this.wallet.mainAddress}?label=NavPi`;
  }

  showBalance() {
    this.rpcSend = {
      command: 'getwalletinfo'
    };
    this.walletService.getBalance(this.rpcSend)
      .subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            console.log('receive: ', typeof receive.data);
            console.log(receive.data);
            this.wallet = {
              ...this.wallet,
              balance: receive['data'],
              address: 'n4Li1jNYkCy82wKrrbwyFRkEtixG2WV678'
            };
          } else {
            console.log('error: ', receive);
          }
        }, error => {
          console.log('error: ', error);
        }
      );
  }

  sendToAddress(destinationAddress, amount, feeIncluded) {
    this.rpcSend = {
      command: 'sendtoaddress',
      params: [destinationAddress, amount.toString(), feeIncluded.toString()]
    };
    this.walletService.sendToAddress(this.rpcSend)
      .subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            console.log('receive: ', typeof receive.data);
          } else {
            console.log('error: ', receive);
          }
        }, error => {
          console.log('error: ', error);
        }
      );
  }

  showUSD() {
    this.explorerService.getUSD()
      .subscribe(
        (data: number) => {
          this.explorer = {
            ...this.explorer,
            tickerUSD: data
          };
        }, error => {
          console.log('error: ', error);
        }
      );
  }

  showBTC() {
    this.explorerService.getBTC()
      .subscribe(
        (data: number) => {
          this.explorer = {
            ...this.explorer,
            tickerBTC: data
          };
        },
        error => {
          console.log('error: ', error);
        }
      );
  }
}
