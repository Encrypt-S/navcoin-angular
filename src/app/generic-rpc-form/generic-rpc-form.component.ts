import { Component, OnInit } from '@angular/core';
import { MzToastService } from 'ngx-materialize';
import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';
import { WalletService } from 'src/app/wallet/wallet.service';

@Component({
  selector: 'app-generic-rpc-form',
  templateUrl: './generic-rpc-form.component.html',
  styleUrls: [
    './generic-rpc-form.component.css',
    '../homepage/homepage.component.css'
  ]
})
export class GenericRpcFormComponent implements OnInit {
  rpcCommand: String;
  rpcResult: any;
  debounce = false;

  constructor(
    private walletService: WalletService,
    private toastService: MzToastService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.debounce = true;
    console.log('RPC Command: ', this.rpcCommand);
    this.toastService.show(`Your RPC is running, please wait`, 4000, 'green');
    const splitCommand = this.rpcCommand.split(' ');
    const rpcData = new RpcSend(splitCommand[0], [...splitCommand.slice(1)]);

    this.walletService.sendRPC(rpcData).subscribe(
      (response: RpcReceive) => {
        if (response.type !== 'SUCCESS') {
          console.log(response);
          if (response.code === 'RPC_001') {
            this.toastService.show(
              `The RPC command you entered is invalid: ${this.rpcCommand}`,
              4000,
              'red'
            );
            this.debounce = false;

            return;
          }
          if (response.code === 'RPC_003') {
            this.toastService.show(
              `The RPC command returned an error`,
              4000,
              'red'
            );
            if (typeof response.data['message'] === 'object') {
              this.rpcResult = JSON.stringify(response.data['message']);
            } else {
              this.rpcResult = response.data['message'];
            }
            this.debounce = false;
            return;
          }
          this.toastService.show(
            'Something went wrong, try again',
            4000,
            'red'
          );
          this.debounce = false;
          return;
        }

        if (typeof response.data === 'object') {
          this.rpcResult = JSON.stringify(response.data);
        } else {
          this.rpcResult = response.data;
        }
        this.debounce = false;
        return;
      },
      error => {
        console.log('error: ', error);
        this.toastService.show('Something went wrong, try again', 4000, 'red');
        this.debounce = false;
      }
    );
  }
}
