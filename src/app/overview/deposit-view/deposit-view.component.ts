import { Component, OnInit } from '@angular/core';
import { ExplorerService } from '../../explorer/explorer.service';
import { WalletModel } from '../../wallet/wallet.model';
import { WalletService } from '../../wallet/wallet.service';
import { RpcReceive } from '../../rpc/rpc-receive.model';
import { RpcSend } from 'src/app/rpc/rpc-send.model';

@Component({
  selector: 'app-deposit-view',
  templateUrl: './deposit-view.component.html',
  styleUrls: ['../overview.component.css', './deposit-view.component.css']
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
    this.getMainAddress();
  }

  getMainAddress() {
    console.log('getaddress called');
    this.walletService.sendAPI('getmainaddress').subscribe(
      (receieve: RpcReceive) => {
        const address = receieve.data.address;
        this.qrMainAddress = `navcoin:${address}?label=NavPi`;
      },
      error => {
        // this.notificationService.addNotification(
        //   new Notification(
        //     `Unable to get transactions ${error}`,
        //     NotifType.ERROR
        //   )
        // );
        return;
      }
    );
  }

  getNewAddress() {
    console.log('getnewaddress called');
    const data = new RpcSend('getnewaddress');
    this.walletService.sendRPC(data).subscribe((receive: RpcReceive) => {
      const address = receive.data;
      console.log(address);
      this.qrMainAddress = `navcoin${address}?label=NavPi`;
    });
  }
}
