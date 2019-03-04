import { OnInit, Injectable } from '@angular/core';
import { NavDroidNotification, NotifType } from './NavDroidNotification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnInit {
  notifications: Array<NavDroidNotification>;
  notifTypes = NotifType;
  constructor() {}

  ngOnInit() {}

  spawnTestNotifications() {
    const testNotifs = [
      new NavDroidNotification('Test success', NotifType.SUCCESS),
      new NavDroidNotification('Test Info', NotifType.INFO),
      new NavDroidNotification('Test Error', NotifType.ERROR),
      new NavDroidNotification('Test Warning', NotifType.WARNING),
      new NavDroidNotification('Test Update', NotifType.UPDATE),
      new NavDroidNotification(
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
  getNotifications(): Array<NavDroidNotification> {
    return this.notifications;
  }
  removeNotification(targetNotif: NavDroidNotification): void {
    this.notifications = this.notifications.filter(notification =>
      notification !== targetNotif ? true : false
    );
  }

  addNotification(newNotif: NavDroidNotification): void {
    if (this.notifications) {
      this.notifications.push(newNotif);
    } else {
      this.notifications = [newNotif];
    }
  }

  addError(error, message) {
    this.addNotification(
      new NavDroidNotification(`${message}: ${error}`, NotifType.ERROR)
    );
  }
}
