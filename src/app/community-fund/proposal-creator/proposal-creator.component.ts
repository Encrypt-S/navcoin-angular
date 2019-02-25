import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WalletService } from 'src/app/wallet/wallet.service';
import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';

@Component({
  selector: 'app-proposal-creator',
  templateUrl: './proposal-creator.component.html',
  styleUrls: ['./proposal-creator.component.css']
})
export class ProposalCreatorComponent implements OnInit {
  constructor(private walletService: WalletService) {}

  proposalForm = new FormGroup({
    proposalDesc: new FormControl(''),
    paymentAddress: new FormControl(''),
    requestedAmount: new FormControl(''),
    duration: new FormControl(''),
    optionalFee: new FormControl('')
  });

  onSubmit() {
    const formData = this.proposalForm.value;
    const arrayData = [
      formData.paymentAddress,
      formData.requestedAmount,
      formData.duration,
      formData.proposalDesc
    ];
    if (formData.optionalFee !== '') {
      arrayData.push(formData.optionalFee);
    }
    const rpcData = new RpcSend('createproposal', arrayData);
    this.walletService.sendRPC(rpcData).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          console.log('Proposal submitted');
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
