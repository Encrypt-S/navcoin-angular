import { Component, OnInit } from '@angular/core';
import { CommunityFundService } from 'src/app/services/community-fund.service';
import {
  NotifType,
  NavDroidNotification
} from 'src/app/notification-bar/NavDroidNotification.model';
import { NotificationService } from 'src/app/notification-bar/notification.service';

@Component({
  selector: 'app-cfund-stats',
  templateUrl: './cfund-stats.component.html',
  styleUrls: ['./cfund-stats.component.css']
})
export class CfundStatsComponent implements OnInit {
  constructor(
    public communityFundService: CommunityFundService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.communityFundService.fetchCfundStats().catch(error => {
      this.notificationService.addNotification(
        new NavDroidNotification(
          `Failed to get Comnity Fund Stats: ${error}`,
          NotifType.ERROR
        )
      );
    });
  }
}
