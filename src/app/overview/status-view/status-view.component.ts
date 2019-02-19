import { Component, OnInit } from '@angular/core';
import { ExplorerModel } from '../../explorer/explorer.model';
import { ExplorerService } from '../../explorer/explorer.service';
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
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: ['./status-view.component.css']
})
export class StatusViewComponent implements OnInit {

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
    private walletService: WalletService
  ) {}

  ngOnInit() {
    this.getWalletOverview();
    this.wallet = {
      ...this.wallet,
      mainAddress: 'NaSdzJ64o8DQo5DMPexVrL4PYFCBZqcmsW'
    };
    this.qrMainAddress = `navcoin:${this.wallet.mainAddress}?label=NavPi`;
  }

  walletLoading() {
    if (this.wallet.balance && this.wallet.stakeData) {
      return true;
    }
    return false;
  }


  getWalletOverview() {
      this.walletService.sendAPI('walletoverview', {})
      .subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            console.log('SUCCESS: ', receive);
            this.wallet = {
              ...this.wallet,
              currentBlock: receive.data.currentBlock,
              highestKnownBlock: receive.data.highestKnownBlock,
              isLocked: receive.data.isLocked,
              isStaking: receive.data.isStaking,
              isSyncing: receive.data.isSyncing,
              walletChain: receive.data.walletChain,
              walletVersion: receive.data.walletVersion,
            };
          } else {
            console.log('error: ', receive);
          }
        }, error => {
          console.log('error: ', error);
        }
      );
  }


}
