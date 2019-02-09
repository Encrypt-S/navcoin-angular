import { Component, OnInit } from '@angular/core';

import { UiPasswordModel } from './ui-password.model';
import { UiPasswordResponse } from './ui-password.response.model';
import { UiPasswordService } from './ui-password.service';

@Component({
  selector: 'app-ui-password',
  templateUrl: './ui-password.component.html'
})
export class UiPasswordComponent implements OnInit {

  uiPassword = new UiPasswordModel();
  uiPasswordResponse: UiPasswordResponse;

  constructor(
    private uiPasswordService: UiPasswordService
  ) {}

  ngOnInit() {

  }

  onSubmit() {
    console.log('ui password: ', this.uiPassword);

    this.uiPasswordService.update(this.uiPassword)
      .subscribe(
        (receive: uiPasswordResponse) => {
          console.log('response: ', receive);
        }, error => {
          console.log('error: ', error);
        }
      );
  }

}
