import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/wallet/wallet.service';
import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css']
})
export class ProposalListComponent implements OnInit {
  constructor(private walletService: WalletService) {}
  proposalList: Array<CFProposal>;
  proposalVotes: any;
  buttonDebounce: Boolean = false;

  ngOnInit() {
    this.fetchProposals();
    this.fetchProposalVotes();
  }

  fetchProposals() {
    const rpcData = new RpcSend('listproposals');
    this.walletService.sendRPC(rpcData).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this.proposalList = [...receive.data];
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
          this.proposalVotes = receive.data;
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
    const vote = this.proposalVotes.no.filter((vote: string) =>
      vote.includes(proposalHash)
    );
    return vote.length === 1 ? true : false;
  }

  votingYes(proposalHash: string) {
    const vote = this.proposalVotes.yes.filter((vote: string) =>
      vote.includes(proposalHash)
    );
    return vote.length === 1 ? true : false;
  }

  proposalVote(proposalHash: string, vote: string) {
    this.buttonDebounce = true;
    if (
      (this.votingYes(proposalHash) && vote === 'yes') ||
      (this.votingNo(proposalHash) && vote === 'no')
    ) {
      vote = 'remove';
    }
    const rpcData = new RpcSend('proposalvote', [proposalHash, vote]);
    this.walletService
      .sendRPC(rpcData)
      .subscribe(
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
      )
      .add(() => {
        this.buttonDebounce = false;
      });
  }
}
