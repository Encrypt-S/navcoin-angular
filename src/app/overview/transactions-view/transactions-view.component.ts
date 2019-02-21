import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../wallet/wallet.service';
import { RpcReceive } from '../../rpc/rpc-receive.model';

@Component({
  selector: 'app-transactions-view',
  templateUrl: './transactions-view.component.html',
  styleUrls: ['../overview.component.css', './transactions-view.component.css']
})
export class TransactionsViewComponent implements OnInit {
  rpcReceive: RpcReceive;

  constructor(private walletService: WalletService) {}

  ngOnInit() {}
}
