import { Component, OnInit } from '@angular/core';
import { Notification, NotifType } from './notification.model';
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

  removeNotification(targetNotif: Notification): void {
    this.notificationService.removeNotification(targetNotif);
  }
}
