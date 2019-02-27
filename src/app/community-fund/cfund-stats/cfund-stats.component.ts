import { Component, OnInit } from '@angular/core';
import { CommunityFundService } from 'src/app/services/community-fund.service';

@Component({
  selector: 'app-cfund-stats',
  templateUrl: './cfund-stats.component.html',
  styleUrls: ['./cfund-stats.component.css']
})
export class CfundStatsComponent implements OnInit {
  constructor(public comFundService: CommunityFundService) {}

  ngOnInit() {
    this.comFundService.fetchCfundStats();
  }
}
