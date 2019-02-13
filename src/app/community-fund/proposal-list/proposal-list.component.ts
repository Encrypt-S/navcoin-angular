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

  constructor(private walletService: WalletService) { }
  proposalList: Array<CFProposal>;

  ngOnInit() {
    this.fetchProposals();
  }

  fetchProposals() {
    const rpcData = new RpcSend('listproposals');
    this.walletService.sendRPC(rpcData)
      .subscribe(
        (receive: RpcReceive) => {
          if (receive.type === 'SUCCESS') {
            console.log(`Proposal Data: ${receive.data[0]}`);
            this.proposalList = [...receive.data];
            console.table(this.proposalList);
          } else {
            console.log('error: ', receive);
          }
        }, error => {
          console.log('error: ', error);
        }
      );

  }
}
