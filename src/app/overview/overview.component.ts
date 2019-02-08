import { Component, OnInit } from '@angular/core';

import { ExplorerModel } from '../explorer/explorer.model';
import { ExplorerService } from '../explorer/explorer.service';

import { WalletModel } from '../wallet/wallet.model';
import { WalletService } from '../wallet/wallet.service';
import { RpcSend } from '../rpc/rpc-send.model';
import { RpcReceive } from '../rpc/rpc-receive.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  explorer: ExplorerModel;
  wallet: WalletModel;
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
    this.wallet = {
      ...this.wallet,
      mainAddress: 'NaSdzJ64o8DQo5DMPexVrL4PYFCBZqcmsW'
    }
    this.qrMainAddress = 'navcoin:' + this.wallet.mainAddress;
  }

  showBalance() {
    this.rpcSend = {
      command: 'getbalance'
    }
    this.walletService.getBalance(this.rpcSend)
      .subscribe(
        (receive: RpcReceive) => {
          if (receive.type == 'SUCCESS') {
            console.log('receive: ', typeof receive.data)
            this.wallet = {
              ...this.wallet,
              balance: receive['data']
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
