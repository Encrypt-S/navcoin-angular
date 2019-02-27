import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';
import { WalletService } from 'src/app/wallet/wallet.service';
import { OnInit, Injectable } from '@angular/core';
import CFProposal from '../models/CFProposal.model';
import { CFVote } from '../models/CFVote.model';
import RPCDataCFundStats from '../models/RPCCommunityFundStats.model';
import CFPaymentRequest from '../models/CFPaymentRequest.model';

// TODO Add Caching

@Injectable()
export class CommunityFundService implements OnInit {
  private _proposalVotes: Array<CFVote>;
  private _paymentRequestList: Array<CFPaymentRequest>;
  private _proposalList: Array<CFProposal>;
  private _communityFundStats: RPCDataCFundStats;
  private _paymentRequestVotes: Array<CFVote>;

  get proposalVotes(): any {
    return this._proposalVotes;
  }

  get proposalList(): Array<CFProposal> {
    return this._proposalList;
  }

  get paymentRequestList(): Array<CFPaymentRequest> {
    return this._paymentRequestList;
  }

  get communityFundStats(): RPCDataCFundStats {
    return this._communityFundStats;
  }

  constructor(private walletService: WalletService) {}

  // Get data

  fetchProposals() {
    const rpcData = new RpcSend('listproposals');
    this.walletService.sendRPC(rpcData).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this._proposalList = [...receive.data];
        } else {
          console.log('error: ', receive);
        }
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  fetchPaymentRequests() {
    const rpcData = new RpcSend('listproposals');
    this.walletService.sendRPC(rpcData).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this._paymentRequestList = [];
          receive.data
            .filter(proposal => proposal.paymentRequests)
            .map((proposal: CFProposal) => {
              const payReqs = proposal.paymentRequests.map(paymentRequest => {
                paymentRequest.parentProposalHash = proposal.hash;
                return paymentRequest;
              });
              this._paymentRequestList.push(...payReqs);
            });
        } else {
          console.log('error: ', receive);
        }
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  fetchCfundStats() {
    const rpcData = new RpcSend('cfundstats');
    this.walletService.sendRPC(rpcData).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this._communityFundStats = receive.data;
        } else {
          console.log('error: ', receive);
        }
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  fetchProposalVotes() {
    const rpcData = new RpcSend('proposalvotelist');
    this.walletService.sendRPC(rpcData).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this._proposalVotes = receive.data;
        } else {
          console.log('error: ', receive);
        }
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  fetchPaymentRequestVotes() {
    const rpcData = new RpcSend('paymentrequestvotelist');
    this.walletService.sendRPC(rpcData).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this._paymentRequestVotes = receive.data;
        } else {
          console.log('error: ', receive);
        }
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  // Update

  updateProposalVote(proposalHash: string, vote: string) {
    if (
      (this.proposalVotingYes(proposalHash) && vote === 'yes') ||
      (this.proposalVotingNo(proposalHash) && vote === 'no')
    ) {
      vote = 'remove';
    }
    const rpcData = new RpcSend('proposalvote', [proposalHash, vote]);
    this.walletService.sendRPC(rpcData).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          console.log('Vote successful');
          this.fetchProposalVotes();
        } else {
          console.log('error: ', receive);
        }
      },
      error => {
        console.log('error: ', error);
      }
    );
  }
  // updatePaymentRequestVote(proposalHash, vote) {
  //   if (
  //     (this.votingYes(proposalHash) && vote === 'yes') ||
  //     (this.votingNo(proposalHash) && vote === 'no')
  //   ) {
  //     vote = 'remove';
  //   }
  //   const rpcData = new RpcSend('paymentrequestvote', [proposalHash, vote]);
  //   this.walletService
  //     .sendRPC(rpcData)
  //     .subscribe(
  //       (receive: RpcReceive) => {
  //         if (receive.type === 'SUCCESS') {
  //           console.log('Vote successful');
  //           this.fetchPaymentRequestVotes();
  //         } else {
  //           console.log('error: ', receive);
  //         }
  //       },
  //       error => {
  //         console.log('error: ', error);
  //       }
  //     )
  //     .add(() => {
  //       this.buttonDebounce = false;
  //     });
  // }

  proposalVotingNo(proposalHash: string) {
    const vote = this.proposalVotes.no.filter((proposalVoteString: string) =>
      proposalVoteString.includes(proposalHash)
    );
    return vote.length === 1 ? true : false;
  }

  proposalVotingYes(proposalHash: string) {
    const vote = this.proposalVotes.yes.filter((proposalVoteString: string) =>
      proposalVoteString.includes(proposalHash)
    );
    return vote.length === 1 ? true : false;
  }

  // Create

  createProposal(formData) {
    const rpcData = new RpcSend('createproposal', formData);
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

  createPaymentRequest(formData) {
    const rpcData = new RpcSend('createpaymentrequest', formData);
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

  // check

  ngOnInit(): void {}
}
