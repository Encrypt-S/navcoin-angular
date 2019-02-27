import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/wallet/wallet.service';
import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { RpcReceive } from 'src/app/rpc/rpc-receive.model';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import CFProposal from 'src/app/models/CFProposal.model';
import RPCCommunityFundVoteList from 'src/app/models/RPCCommunityFundVoteList.model';
import { CFVote } from 'src/app/models/CFVote.model';
import VoteType from 'src/app/models/VoteType.model';

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
  dataRefresher: Subscription;

  ngOnInit() {
    this.fetchProposalData();
    this.dataRefresher = Observable.interval(30000).subscribe(val => {
      console.log('Fetching new Proposal data');
      this.fetchProposalData();
    });
  }

  fetchProposalData() {
    const rpcData = [
      new RpcSend('listproposals'),
      new RpcSend('proposalvotelist')
    ];
    this.walletService.sendBatchRPC(rpcData).subscribe(
      (receive: RpcReceive) => {
        if (receive.type === 'SUCCESS') {
          this.createProposalObjects(receive.data[0], receive.data[1]);
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

  addVotesToProposals(proposals, votes: RPCCommunityFundVoteList) {
    return proposals.map(proposal => {
      const hash = proposal.proposalHash;
      let proposalVote = new CFVote(VoteType.NONE);

      const noVote = votes.no.filter(vote => hash === votes.getHash(vote));
      if (noVote.length < 0) {
        proposalVote = new CFVote(VoteType.NO);
        proposal.vote = proposalVote;
        return proposal;
      }

      const yesVote = votes.yes.filter(vote => hash === votes.getHash(vote));
      if (yesVote.length < 0) {
        proposalVote = new CFVote(VoteType.YES);
        proposal.vote = proposalVote;
        return proposal;
      }
      proposal.vote = proposalVote;
      return proposal;
    });
  }
}
