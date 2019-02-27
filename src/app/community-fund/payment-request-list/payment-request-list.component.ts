import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/wallet/wallet.service';
import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-payment-request-list',
  templateUrl: './payment-request-list.component.html',
  styleUrls: ['./payment-request-list.component.css']
})
export class PaymentRequestListComponent implements OnInit {
  constructor(private walletService: WalletService) {}
  paymentRequestList: Array<CFPaymentRequest>;
  paymentRequestVotes: any;
  buttonDebounce: Boolean = false;
  dataRefresher: Subscription;

  ngOnInit() {
    this.fetchPaymentRequests();
    this.fetchPaymentRequestVotes();
    this.dataRefresher = Observable.interval(30000).subscribe(val => {
      console.log('Fetching new PReq data');
      this.fetchPaymentRequests();
      this.fetchPaymentRequestVotes();
    });
  }

  fetchPaymentRequests() {
    // const rpcData = new RpcSend('listproposals');
    // this.walletService.sendRPC(rpcData).subscribe(
    //   (receive: RpcReceive) => {
    //     if (receive.type === 'SUCCESS') {
    //       this.paymentRequestList = [];
    //       receive.data
    //         .filter(proposal => proposal.paymentRequests)
    //         .map((new CFProposal(...proposal)) => {
    //           const payReqs = proposal.paymentRequests.map(paymentRequest => {
    //             paymentRequest.parentProposalHash = proposal.hash;
    //             return paymentRequest;
    //           });
    //           this.paymentRequestList.push(...payReqs);
    //         });
    //     } else {
    //       console.log('error: ', receive);
    //     }
    //   },
    //   error => {
    //     console.log('error: ', error);
    //   }
    // );
  }

  fetchPaymentRequestVotes() {
    const rpcData = new RpcSend('paymentrequestvotelist');
    this.walletService.sendRPC(rpcData).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this.paymentRequestVotes = receive.data;
        } else {
          console.log('error: ', receive);
        }
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  votingNo(proposalHash: string) {
    const vote = this.paymentRequestVotes.no.filter(
      (paymentReqVoteString: string) =>
        paymentReqVoteString.includes(proposalHash)
    );
    return vote.length === 1 ? true : false;
  }

  votingYes(proposalHash: string) {
    const vote = this.paymentRequestVotes.yes.filter(
      (paymentReqVoteString: string) =>
        paymentReqVoteString.includes(proposalHash)
    );
    return vote.length === 1 ? true : false;
  }

  paymentRequestVote(proposalHash: string, vote: string) {
    this.buttonDebounce = true;
    if (
      (this.votingYes(proposalHash) && vote === 'yes') ||
      (this.votingNo(proposalHash) && vote === 'no')
    ) {
      vote = 'remove';
    }
    const rpcData = new RpcSend('paymentrequestvote', [proposalHash, vote]);
    this.walletService
      .sendRPC(rpcData)
      .subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            console.log('Vote successful');
            this.fetchPaymentRequestVotes();
          } else {
            console.log('error: ', receive);
          }
        },
        error => {
          console.log('error: ', error);
        }
      )
      .add(() => {
        this.buttonDebounce = false;
      });
  }
}
