import { Component, OnInit } from '@angular/core';
import { ExplorerModel } from '../../explorer/explorer.model';
import { WalletService } from '../../wallet/wallet.service';
import { RpcSend } from '../../rpc/rpc-send.model';
import { RpcReceive } from '../../rpc/rpc-receive.model';
import { StakeReportData } from 'src/app/models/StakeReportData.model';
import { NotificationService } from 'src/app/notification-bar/notification.service';

@Component({
  selector: 'app-staking-overview',
  templateUrl: './staking-overview.component.html',
  styleUrls: ['../homepage.component.css', './staking-overview.component.css']
})
export class StakingOverviewComponent implements OnInit {
  explorer: ExplorerModel;
  stakeData: StakeReportData;
  rpcReceive: RpcReceive;

  constructor(
    private walletService: WalletService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getStakeReport();
  }

  getStakeReport() {
    const rpcData = new RpcSend('getstakereport');
    this.walletService.sendRPC(rpcData).subscribe(
      (response: RpcReceive) => {
        if (response.type === 'SUCCESS') {
          this.stakeData = {
            today: response.data['Last 24H'],
            week: response.data['Last 7 Days'],
            month: response.data['Last 30 Days'],
            year: response.data['Last 365 Days']
          };
        } else {
          this.notificationService.addError(
            `${response.message} ${response.code} ${[...response.data]}`,
            'Unable to get staking report data'
          );
        }
      },
      error => {
        this.notificationService.addError(
          error,
          'Unable to get staking report data'
        );
      }
    );
  }
}
