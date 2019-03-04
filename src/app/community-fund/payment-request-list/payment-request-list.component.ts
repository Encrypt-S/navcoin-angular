import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import { CommunityFundService } from 'src/app/services/community-fund.service';

@Component({
  selector: 'app-payment-request-list',
  templateUrl: './payment-request-list.component.html',
  styleUrls: ['./payment-request-list.component.css']
})
export class PaymentRequestListComponent implements OnInit {
  constructor(public comFundService: CommunityFundService) {}
  buttonDebounce: Boolean = false;
  dataRefresher: Subscription;

  ngOnInit() {
    console.log('PaymentRequestListComponent fetching new paymentRequest data');
    this.comFundService.fetchPaymentRequestVotes();
    this.comFundService.fetchPaymentRequests();

    this.dataRefresher = Observable.interval(30000).subscribe(val => {
      console.log(
        'PaymentRequestListComponent fetching new paymentRequest data'
      );
      this.comFundService.fetchPaymentRequestVotes();
      this.comFundService.fetchPaymentRequests();
    });
  }

  paymentRequestVote(proposalHash: string, vote: string) {
    this.buttonDebounce = true;
    // if (
    //   (this.votingYes(proposalHash) && vote === 'yes') ||
    //   (this.votingNo(proposalHash) && vote === 'no')
    // ) {
    //   vote = 'remove';
    // }
    // const rpcData = new RpcSend('paymentrequestvote', [proposalHash, vote]);
    // this.walletService
    //   .sendRPC(rpcData)
    //   .subscribe(
    //     (receive: RpcReceive) => {
    //       if (receive.type === 'SUCCESS') {
    //         console.log('Vote successful');
    //         this.fetchPaymentRequestVotes();
    //       } else {
    //         console.log('error: ', receive);
    //       }
    //     },
    //     error => {
    //       console.log('error: ', error);
    //     }
    //   )
    //   .add(() => {
    //     this.buttonDebounce = false;
    //   });
  }
}
