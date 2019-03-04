import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification-bar/notification.service';
import { FormGroup, FormControl } from '@angular/forms';

import {
  NavDroidNotification,
  NotifType
} from '../notification-bar/NavDroidNotification.model';

@Component({
  selector: 'app-notification-maker',
  templateUrl: './notification-maker.component.html',
  styleUrls: ['./notification-maker.component.css']
})
export class NotificationMakerComponent implements OnInit {
  notifTypes = NotifType;
  notificationModel = NavDroidNotification;

  notificationForm = new FormGroup({
    description: new FormControl(''),
    type: new FormControl(''),
    URL: new FormControl('')
  });

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {}
  spawnTestNotifications() {
    this.notificationService.spawnTestNotifications();
  }
  onSubmit(): void {
    const formData = this.notificationForm.value;
    const newNotif = new NavDroidNotification(
      formData.description,
      formData.type,
      formData.URL
    );
    this.notificationForm.reset();

    this.notificationService.addNotification(newNotif);
  }
}
