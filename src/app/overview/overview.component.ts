import { Component, OnInit } from '@angular/core';

import { ExplorerModel } from '../explorer/explorer.model';
import { ExplorerService } from '../explorer/explorer.service';

import { WalletModel } from '../wallet/wallet.model';
import { WalletService } from '../wallet/wallet.service';
import { RpcModel } from '../rpc/rpc.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  explorer: ExplorerModel;
  wallet: WalletModel;
  rpcData: RpcModel;

  constructor(
    private explorerService: ExplorerService,
    private walletService: WalletService
  ) {}

  ngOnInit() {
    this.showUSD();
    this.showBTC();
    this.showBalance();
  }

  showBalance() {
    this.rpcData = {
      command: 'getbalance'
    }
    this.walletService.getBalance(this.rpcData)
      .subscribe(
        (data: object) => {
          if (data.type == 'SUCCESS') {
            this.wallet = {
              ...this.wallet,
              balance: data.data
            };
          } else {
            console.log('error: ', data);
          }
        error => {
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
        error => {
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
