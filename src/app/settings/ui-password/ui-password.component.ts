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
    private toastService: MzToastService,
  ) {}

  ngOnInit() {

  }

  onSubmit() {
    console.log('ui password: ', this.uiPassword);

    this.uiPasswordService.update(this.uiPassword)
      .subscribe(
        (response: UiPasswordResponse) => {

          if (response.type != 'SUCCESS') {
            this.toastService.show('Something went wrong, try again', 4000, 'red');
            return
          }

          this.uiPassword = new UiPasswordModel();
          this.toastService.show('User Login Updated', 4000, 'green');
          return

        }, error => {
          console.log('error: ', error);
          this.toastService.show('Something went wrong, try again', 4000, 'red');
        }
      );
  }

}
