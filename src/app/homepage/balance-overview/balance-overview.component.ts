import { Component, OnInit } from '@angular/core';
import { ExplorerModel } from '../../explorer/explorer.model';
import { ExplorerService } from '../../explorer/explorer.service';
import { WalletModel } from '../../wallet/wallet.model';
import { WalletService } from '../../wallet/wallet.service';
import { RpcSend } from '../../rpc/rpc-send.model';
import { RpcReceive } from '../../rpc/rpc-receive.model';
import { NotificationService } from 'src/app/notification-bar/notification.service';

@Component({
  selector: 'app-balance-overview',
  templateUrl: './balance-overview.component.html',
  styleUrls: ['../homepage.component.css', './balance-overview.component.css']
})
export class BalanceOverviewComponent implements OnInit {
  explorer: ExplorerModel;
  wallet: WalletModel;
  rpcReceive: RpcReceive;

  constructor(
    private explorerService: ExplorerService,
    private walletService: WalletService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.showUSD();
    this.showBTC();
    this.showBalance();
  }

  showBalance() {
    const rpcData = new RpcSend('getwalletinfo');
    this.walletService.sendRPC(rpcData).subscribe(
      (response: RpcReceive) => {
        if (response.type === 'SUCCESS') {
          this.wallet = {
            ...this.wallet,
            balance: parseFloat(response.data.balance),
            coldStakingBalance: parseFloat(response.data.coldstaking_balance),
            unconfirmedBalance: parseFloat(response.data.unconfirmed_balance),
            immatureBalance: parseFloat(response.data.immature_balance)
          };
        }
      },
      error => {
        this.notificationService.addError(
          error,
          'Unable to get wallet balance data'
        );
      }
    );
  }

  showUSD() {
    this.explorerService.getUSD().subscribe(
      (data: number) => {
        this.explorer = {
          ...this.explorer,
          tickerUSD: data
        };
      },
      error => {
        this.notificationService.addError(error, 'Unable to get USD data');
      }
    );
  }

  showBTC() {
    this.explorerService.getBTC().subscribe(
      (data: number) => {
        this.explorer = {
          ...this.explorer,
          tickerBTC: data
        };
      },
      error => {
        this.notificationService.addError(error, 'Unable to get BTC data');
      }
    );
  }
}
