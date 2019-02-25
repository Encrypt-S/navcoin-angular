import { Component, OnInit } from '@angular/core';
import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';
import { WalletService } from 'src/app/wallet/wallet.service';

@Component({
  selector: 'app-cfund-stats',
  templateUrl: './cfund-stats.component.html',
  styleUrls: ['./cfund-stats.component.css']
})
export class CfundStatsComponent implements OnInit {
  cfundStats: CFundStats;

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.fetchCFundStats();
  }

  fetchCFundStats() {
    const rpcData = new RpcSend('cfundstats');
    this.walletService.sendRPC(rpcData).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this.cfundStats = receive.data;
        } else {
          console.log('error: ', receive);
        }
      },
      error => {
        console.log('error: ', error);
      }
    );
  }
}
