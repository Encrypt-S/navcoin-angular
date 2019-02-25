import { OnInit, Injectable } from '@angular/core';
import { Notification, NotifType } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnInit {
  notifications: Array<Notification>;
  notifTypes = NotifType;
  constructor() {}

  ngOnInit() {}

  spawnTestNotifications() {
    const testNotifs = [
      new Notification('Test success', NotifType.SUCCESS),
      new Notification('Test Info', NotifType.INFO),
      new Notification('Test Error', NotifType.ERROR),
      new Notification('Test Warning', NotifType.WARNING),
      new Notification('Test Update', NotifType.UPDATE),
      new Notification(
        'There is a new wallet update, read about it here - ',
        NotifType.UPDATE,
        'www.navcoin.org'
      )
    ];
    if (this.notifications) {
      this.notifications.push(...testNotifs);
    } else {
      this.notifications = testNotifs;
    }
  }
  getNotifications(): Array<Notification> {
    return this.notifications;
  }
  removeNotification(targetNotif: Notification): void {
    this.notifications = this.notifications.filter(notification =>
      notification !== targetNotif ? true : false
    );
  }

  addNotification(newNotif: Notification): void {
    if (this.notifications) {
      this.notifications.push(newNotif);
    } else {
      this.notifications = [newNotif];
    }
  }
}
