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
    this.getStakeReport();
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
    this.walletService.sendRPC(this.rpcSend)
      .subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            this.wallet = {
              ...this.wallet,
              balance: receive.data.balance,
              coldStakingBalance: receive.data.coldstaking_balance,
              unconfirmedBalance: receive.data.unconfirmed_balance,
              immatureBalance: receive.data.immature_balance,
            };
          } else {
            console.log('error: ', receive);
          }
        }, error => {
          console.log('error: ', error);
        }
      );
  }

  walletLoading() {
    if (this.wallet.balance && this.wallet.staking) {
      return true;
    }
    return false;
  }

  sendToAddress(destinationAddress, amount, feeIncluded) {
    this.rpcSend = {
      command: 'sendtoaddress',
      params: [destinationAddress, amount.toString(), feeIncluded.toString()]
    };
    this.walletService.sendRPC(this.rpcSend)
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

  getStakeReport() {
    this.rpcSend = {
      command: 'getstakereport',
    };
    this.walletService.sendRPC(this.rpcSend)
      .subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            this.wallet = {
              ...this.wallet,
              staking: {
                today: receive.data['Last 24H'],
                week: receive.data['Last 7 Days'],
                month: receive.data['Last 30 Days'],
                year: receive.data['Last 365 Days'],
              },
            };
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
