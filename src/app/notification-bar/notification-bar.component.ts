import { Component, OnInit } from '@angular/core';
import { NavDroidNotification, NotifType } from './NavDroidNotification.model';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css']
})
export class NotificationBarComponent implements OnInit {
  notifTypes = NotifType;
  constructor(public notificationService: NotificationService) {}

  ngOnInit() {}

  removeNotification(targetNotif: NavDroidNotification): void {
    this.notificationService.removeNotification(targetNotif);
  }
}
