import { Component, OnInit } from '@angular/core';

import { DeviceUtilsModel } from './device-utils.model';
import { DeviceUtilsResponse } from './device-utils.response.model';
import { DeviceUtilsService } from './device-utils.service';
import { MzToastService } from 'ngx-materialize';
import { NotificationService } from 'src/app/notification-bar/notification.service';
import {
  NavDroidNotification,
  NotifType
} from 'src/app/notification-bar/NavDroidNotification.model';

@Component({
  selector: 'app-device-utils',
  templateUrl: './device-utils.component.html',
  styleUrls: ['./device-utils.component.css']
})
export class DeviceUtilsComponent implements OnInit {

  deviceUtils = new DeviceUtilsModel();
  deviceUtilsResponse: DeviceUtilsResponse;
  disableUiButton = false;
  disableRestartButton = false;
  loginRedirect;

  constructor(
    private deviceUtilsService: DeviceUtilsService,
    private notificationService: NotificationService,
    private toastService: MzToastService
  ) { }

  ngOnInit() {
    const url = window.location.href;
    const parts = url.split(':');
    this.loginRedirect = parts[0] + parts[1] + '/login';
  }

  onSubmitUpdate() {
    this.disableUiButton = true;
    this.deviceUtilsService.update(this.deviceUtils).subscribe(
      (response: DeviceUtilsResponse) => {
        if (response.type != 'SUCCESS') {
          this.toastService.show(
            response.message,
            4000,
            'red'
          );
          this.disableUiButton = false;
          return;
        }

        this.deviceUtils = new DeviceUtilsModel();

        const newNotif = new NavDroidNotification(
          'The web service is now restarting, please reauthenticate when it\'s online.',
          NotifType.SUCCESS,
          this.loginRedirect
        );

        this.notificationService.addNotification(newNotif);

        return;
      },
      error => {
        console.log('error: ', error);
        this.deviceUtils = new DeviceUtilsModel();
        this.toastService.show(
          error.error.message,
          4000,
          'red'
        );
        this.disableUiButton = false;
      }
    );
  }

  onSubmitRestart() {
    this.disableRestartButton = true;
    this.deviceUtilsService.restart(this.deviceUtils).subscribe(
      (response: DeviceUtilsResponse) => {
        if (response.type != 'SUCCESS') {
          this.toastService.show(
            response.message,
            4000,
            'red'
          );
          return;
          this.disableRestartButton = false;
        }

        this.deviceUtils = new DeviceUtilsModel();
        const newNotif = new NavDroidNotification(
          'The device is now rebooting, please reauthenticate when it\'s powered up.',
          NotifType.SUCCESS,
          this.loginRedirect
        );

        this.notificationService.addNotification(newNotif);
      },
      error => {
        console.log('error: ', error);
        this.deviceUtils = new DeviceUtilsModel();
        this.toastService.show(
          error.error.message,
          4000,
          'red'
        );
        this.disableRestartButton = false;
      }
    );
  }

}
