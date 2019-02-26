import { Component, OnInit } from '@angular/core';
import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';
import { CommunityFundService } from 'src/app/services/community-fund.service';
import RPCDataCFundStats from 'src/app/models/RPCCommunityFundStats.model';

@Component({
  selector: 'app-cfund-stats',
  templateUrl: './cfund-stats.component.html',
  styleUrls: ['./cfund-stats.component.css']
})
export class CfundStatsComponent implements OnInit {
  cfundStats: RPCDataCFundStats;

  constructor(public comFundService: CommunityFundService) {}

  ngOnInit() {
    this.comFundService.fetchCfundStats();
  }
}
