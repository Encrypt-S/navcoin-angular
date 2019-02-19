import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WalletService } from 'src/app/wallet/wallet.service';
import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';

@Component({
  selector: 'app-payment-request-creator',
  templateUrl: './payment-request-creator.component.html',
  styleUrls: ['./payment-request-creator.component.css']
})
export class PaymentRequestCreatorComponent implements OnInit {
  constructor(private walletService: WalletService) {}

  paymentReqForm = new FormGroup({
    proposalHash: new FormControl(''),
    uniqueID: new FormControl(''),
    requestedAmount: new FormControl('')
  });

  onSubmit() {
    const formData = this.paymentReqForm.value;
    const arrayData = [
      formData.proposalHash,
      formData.requestedAmount,
      formData.uniqueID
    ];
    const rpcData = new RpcSend('createpaymentrequest', arrayData);
    this.walletService.sendRPC(rpcData).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          console.log('Payment Request submitted');
        } else {
          console.log('error: ', receive);
        }
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  ngOnInit() {}
}
