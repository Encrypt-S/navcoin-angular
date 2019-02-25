import { Component, OnInit } from '@angular/core';
import { ExplorerService } from '../../explorer/explorer.service';
import { WalletModel } from '../../wallet/wallet.model';
import { WalletService } from '../../wallet/wallet.service';
import { RpcReceive } from '../../rpc/rpc-receive.model';


@Component({
  selector: 'app-deposit-view',
  templateUrl: './deposit-view.component.html',
  styleUrls: ['../overview.component.css','./deposit-view.component.css']
})
export class DepositViewComponent implements OnInit {
  wallet: WalletModel;
  rpcReceive: RpcReceive;
  qrMainAddress: string;

  constructor(
    private explorerService: ExplorerService,
    private walletService: WalletService
  ) {}

  ngOnInit() {
    this.wallet = {
      ...this.wallet,
      mainAddress: 'NaSdzJ64o8DQo5DMPexVrL4PYFCBZqcmsW'
    };
    this.qrMainAddress = `navcoin:${this.wallet.mainAddress}?label=NavPi`;
  }
}
