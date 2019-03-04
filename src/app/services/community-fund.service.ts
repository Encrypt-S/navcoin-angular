import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';
import { WalletService } from 'src/app/wallet/wallet.service';
import { OnInit, Injectable } from '@angular/core';
import CFProposal from '../models/CFProposal.model';
import { CFVote } from '../models/CFVote.model';
import RPCDataCFundStats from '../models/RPCCommunityFundStats.model';
import CFPaymentRequest from '../models/CFPaymentRequest.model';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification-bar/notification.service';
import { NavDroidNotification } from '../notification-bar/NavDroidNotification.model';

// TODO Add Caching

@Injectable()
export class CommunityFundService implements OnInit {
  private notificationService = new NotificationService();

  private _proposalVotes: any = {
    yes: new Array<CFVote>(),
    no: new Array<CFVote>(),
    null: new Array<CFVote>()
  };

  private _paymentRequestList: Array<CFPaymentRequest> = new Array<
    CFPaymentRequest
  >();
  private _proposalList: Array<CFProposal> = new Array<CFProposal>();
  private _communityFundStats: RPCDataCFundStats = new RPCDataCFundStats();
  private _paymentRequestVotes: any = {
    yes: new Array<CFVote>(),
    no: new Array<CFVote>(),
    null: new Array<CFVote>()
  };

  get proposalVotes(): any {
    return this._proposalVotes;
  }

  get paymentRequestVotes(): any {
    return this._paymentRequestVotes;
  }

  get proposalList(): Array<CFProposal> {
    return this._proposalList;
  }

  getFilteredProposalList(statusFilter): Array<CFProposal> {
    if (statusFilter) {
      return this._proposalList.filter(proposal => {
        return proposal.status === statusFilter;
      });
    }
    return new Array<CFProposal>();
  }

  getFilteredPaymentRequestList(statusFilter): Array<CFPaymentRequest> {
    if (statusFilter) {
      return this._paymentRequestList.filter(paymentRequest => {
        return paymentRequest.status === statusFilter;
      });
    }
    return new Array<CFPaymentRequest>();
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
    return new Promise((resolve, reject) => {
      const rpcData = new RpcSend('listproposals');
      this.walletService.sendRPC(rpcData).subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            this._proposalList = [...receive.data];
            resolve();
          } else {
            reject(`${receive.message} ${receive.code} ${[...receive.data]}`);
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

  fetchPaymentRequests() {
    return new Promise((resolve, reject) => {
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
            resolve();
          } else {
            reject(`${receive.message} ${receive.code} ${[...receive.data]}`);
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

  fetchCfundStats() {
    return new Promise((resolve, reject) => {
      const rpcData = new RpcSend('cfundstats');
      this.walletService.sendRPC(rpcData).subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            this._communityFundStats = receive.data;
            resolve();
          } else {
            reject(`${receive.message} ${receive.code} ${[...receive.data]}`);
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

  fetchProposalVotes() {
    return new Promise((resolve, reject) => {
      const rpcData = new RpcSend('proposalvotelist');
      this.walletService.sendRPC(rpcData).subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            this._proposalVotes = receive.data;
            resolve();
          } else {
            reject(`${receive.message} ${receive.code} ${[...receive.data]}`);
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

  fetchPaymentRequestVotes() {
    const rpcData = new RpcSend('paymentrequestvotelist');
    this.walletService.sendRPC(rpcData).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this._paymentRequestVotes = receive.data;
        } else {
          // reject(`${receive.message} ${receive.code} ${[...receive.data]}`);
        }
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  // Update

  updateProposalVote(proposalHash: string, vote: string) {
    return new Promise((resolve, reject) => {
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
            this.fetchProposalVotes();
            resolve();
          } else {
            reject(`${receive.message} ${receive.code} ${[...receive.data]}`);
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

  updatePaymentRequestVote(paymentRequestHash: string, vote: string) {
    return new Promise((resolve, reject) => {
      if (
        (this.paymentRequestVotingYes(paymentRequestHash) && vote === 'yes') ||
        (this.paymentRequestVotingNo(paymentRequestHash) && vote === 'no')
      ) {
        vote = 'remove';
      }
      const rpcData = new RpcSend('paymentRequestvote', [
        paymentRequestHash,
        vote
      ]);
      this.walletService.sendRPC(rpcData).subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            this.fetchPaymentRequestVotes();
            resolve();
          } else {
            reject(`${receive.message} ${receive.code} ${[...receive.data]}`);
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

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

  paymentRequestVotingNo(paymentRequestHash: string) {
    const vote = this._paymentRequestVotes.no.filter(
      (paymentRequestVoteString: string) =>
        paymentRequestVoteString.includes(paymentRequestHash)
    );
    return vote.length === 1 ? true : false;
  }

  paymentRequestVotingYes(paymentRequestHash: string) {
    const vote = this._paymentRequestVotes.yes.filter(
      (paymentRequestVoteString: string) =>
        paymentRequestVoteString.includes(paymentRequestHash)
    );
    return vote.length === 1 ? true : false;
  }

  // Create

  createProposal(formData) {
    return new Promise((resolve, reject) => {
      const rpcData = new RpcSend('createproposal', formData);
      this.walletService.sendRPC(rpcData).subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            resolve();
          } else {
            reject(`${receive.message} ${receive.code} ${[...receive.data]}`);
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

  createPaymentRequest(formData) {
    return new Promise((resolve, reject) => {
      const rpcData = new RpcSend('createpaymentrequest', formData);
      this.walletService.sendRPC(rpcData).subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            resolve();
          } else {
            reject(`${receive.message} ${receive.code} ${[...receive.data]}`);
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

  // check

  ngOnInit(): void {}
}
