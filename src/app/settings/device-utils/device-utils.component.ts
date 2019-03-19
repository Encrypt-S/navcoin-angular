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

  constructor(
    private deviceUtilsService: DeviceUtilsService,
    private notificationService: NotificationService,
    private toastService: MzToastService
  ) { }

  ngOnInit() { }

  onSubmitUpdate() {

    this.deviceUtilsService.update(this.deviceUtils).subscribe(
      (response: DeviceUtilsResponse) => {
        if (response.type != 'SUCCESS') {
          this.toastService.show(
            response.message,
            4000,
            'red'
          );
          return;
        }

        this.deviceUtils = new DeviceUtilsModel();


        const newNotif = new NavDroidNotification(
          'UI Updated, please restart the device for the changes to take effect',
          NotifType.WARNING
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
      }
    );
  }

  onSubmitRestart() {

    this.deviceUtilsService.restart(this.deviceUtils).subscribe(
      (response: DeviceUtilsResponse) => {
        if (response.type != 'SUCCESS') {
          this.toastService.show(
            response.message,
            4000,
            'red'
          );
          return;
        }

        this.deviceUtils = new DeviceUtilsModel();
        this.toastService.show('StakeBox Restarting', 4000, 'green');
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
      }
    );
  }

}
