import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';
import { WalletService } from 'src/app/wallet/wallet.service';
import { OnInit, Injectable } from '@angular/core';
import CFProposal from '../models/CFProposal.model';
import RPCDataCFundStats from '../models/RPCCommunityFundStats.model';
import CFPaymentRequest from '../models/CFPaymentRequest.model';
import RPCCFundVoteContainer from '../models/RPCCFundVotes.model';

// TODO Add Caching ?

@Injectable()
export class CommunityFundService implements OnInit {
  private _proposalVotes: RPCCFundVoteContainer;

  private _paymentRequestList: Array<CFPaymentRequest>;
  private _proposalList: Array<CFProposal>;
  private _communityFundStats: RPCDataCFundStats;
  private _paymentRequestVotes: RPCCFundVoteContainer;

  get proposalVotes(): any {
    return this._proposalVotes;
  }

  get paymentRequestVotes(): any {
    return this._paymentRequestVotes;
  }

  get proposalList(): Array<CFProposal> {
    return this._proposalList;
  }

  getFilteredProposalList(statusFilter: Array<string>): Array<CFProposal> {
    if (!statusFilter) {
      return new Array<CFProposal>();
    } else if (statusFilter.length > 0) {
      return this._proposalList.filter(proposal =>
        statusFilter.includes(proposal.status)
      );
    } else {
      return this._proposalList;
    }
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
            const paymentRequestList = [];
            receive.data
              .filter(proposal => proposal.paymentRequests)
              .map((proposal: CFProposal) => {
                const payReqs = proposal.paymentRequests.map(paymentRequest => {
                  paymentRequest.parentProposalHash = proposal.hash;
                  return paymentRequest;
                });
                paymentRequestList.push(...payReqs);
              });
            this._paymentRequestList = paymentRequestList;
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
    return new Promise((resolve, reject) => {
      const rpcData = new RpcSend('paymentrequestvotelist');
      this.walletService.sendRPC(rpcData).subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            this._paymentRequestVotes = receive.data;
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
      const rpcData = new RpcSend('paymentrequestvote', [
        paymentRequestHash,
        vote
      ]);
      this.walletService.sendRPC(rpcData).subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            resolve();
          } else {
            reject(
              `${receive.message} ${receive.code} ${JSON.stringify(
                receive.data
              )}`
            );
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
