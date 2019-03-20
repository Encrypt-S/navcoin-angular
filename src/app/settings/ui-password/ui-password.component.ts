import { Component, OnInit } from '@angular/core';

import { UiPasswordModel } from './ui-password.model';
import { UiPasswordResponse } from './ui-password.response.model';
import { UiPasswordService } from './ui-password.service';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-ui-password',
  templateUrl: './ui-password.component.html'
})
export class UiPasswordComponent implements OnInit {
  uiPassword = new UiPasswordModel();
  uiPasswordResponse: UiPasswordResponse;

  constructor(
    private uiPasswordService: UiPasswordService,
    private toastService: MzToastService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.uiPassword.password !== this.uiPassword.confirmPassword) {
      this.toastService.show(
        'Your new password does not match the confirm field, please check you typed it correctly in both fields',
        5000,
        'red'
      );
      return;
    } else {
      this.uiPasswordService.update(this.uiPassword).subscribe(
        (response: UiPasswordResponse) => {
          if (response.type != 'SUCCESS') {
            if (response.code == 'AUTH_002') {
              this.toastService.show(
                'The current username or password you entered is invalid',
                4000,
                'red'
              );
              return;
            }
            this.toastService.show(
              'Something went wrong, try again',
              4000,
              'red'
            );
            return;
          }

          this.uiPassword = new UiPasswordModel();
          this.toastService.show('User Login Updated', 4000, 'green');
          return;
        },
        error => {
          console.log('error: ', error);
          this.toastService.show(
            'Something went wrong, try again',
            4000,
            'red'
          );
        }
      );
    }
  }
}
