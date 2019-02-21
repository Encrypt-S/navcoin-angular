import { Component, OnInit } from '@angular/core';
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
  selector: 'app-send-to-view',
  templateUrl: './send-to-view.component.html',
  styleUrls: ['../overview.component.css','./send-to-view.component.css']
})
export class SendToViewComponent implements OnInit {

  wallet: WalletModel;
  transaction: SendToAddressModel = {
    amount: undefined,
    destinationAddress: undefined,
    feeIncluded: false,
  };
  rpcReceive: RpcReceive;

  constructor(
    private explorerService: ExplorerService,
    private walletService: WalletService
  ) {}

  ngOnInit() {
  }

  sendToAddress(destinationAddress, amount, feeIncluded) {
    const rpcData = new RpcSend('sendtoaddress', [destinationAddress, amount.toString(), feeIncluded.toString()]);
    this.walletService.sendRPC(rpcData)
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

}
