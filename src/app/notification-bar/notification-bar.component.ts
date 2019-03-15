import { Component, OnInit } from '@angular/core';
import { NavDroidNotification, NotifType } from './NavDroidNotification.model';
import { NotificationService } from './notification.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css']
})
export class NotificationBarComponent implements OnInit {
  notifTypes = NotifType;
  authed: Boolean;

  constructor(
    public notificationService: NotificationService,
    public auth: AuthService,
    public router: Router
  ) {
    router.events.subscribe(val => {
      if (!this.auth.isAuthenticated()) {
        this.authed = false;
      } else {
        this.authed = true;
      }
    });
  }

  ngOnInit() {}

  removeNotification(targetNotif: NavDroidNotification): void {
    this.notificationService.removeNotification(targetNotif);
  }
}
