import { Component, OnInit } from '@angular/core';
import { MzToastService } from 'ngx-materialize';
import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';
import { WalletService } from 'src/app/wallet/wallet.service';

@Component({
  selector: 'app-generic-rpc-form',
  templateUrl: './generic-rpc-form.component.html',
  styleUrls: ['./generic-rpc-form.component.css']
})
export class GenericRpcFormComponent implements OnInit {
  rpcCommand: String;
  rpcResult: any;

  constructor(
    private walletService: WalletService,
    private toastService: MzToastService
  ) {}

  ngOnInit() {}

  onSubmit() {
    console.log('RPC Command: ', this.rpcCommand);
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
            return;
          }
          if (response.code === 'RPC_003') {
            this.toastService.show(
              `The RPC command returned an error`,
              4000,
              'red'
            );
            this.rpcResult = response.data['message'];
            return;
          }
          this.toastService.show(
            'Something went wrong, try again',
            4000,
            'red'
          );
          return;
        }

        this.rpcResult = response.data;
        return;
      },
      error => {
        console.log('error: ', error);
        this.toastService.show('Something went wrong, try again', 4000, 'red');
      }
    );
  }
}
