import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { NotificationService } from 'src/app/notification-bar/notification.service';

import { RpcSend } from 'src/app/rpc/rpc-send.model';
import { RpcReceive } from '../../rpc/rpc-receive.model';
import {
  NavDroidNotification,
  NotifType
} from 'src/app/notification-bar/NavDroidNotification.model';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-detailed-transactions-card',
  templateUrl: './detailed-transactions-card.component.html',
  styleUrls: ['./detailed-transactions-card.component.css']
})
export class DetailedTransactionsCardComponent implements OnInit {
  rpcReceive: RpcReceive;
  transactions: Array<Transaction>;

  constructor(
    private walletService: WalletService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getTransactions();
  }
  getDateNum(str) {
    return parseInt(str) * 1000;
  }
  getTransactions() {
    const command = new RpcSend('listtransactions', ['', 999999999]);
    this.walletService.sendRPC(command).subscribe(
      (receieve: RpcReceive) => {
        if (receieve.type === 'SUCCESS') {
          this.transactions = receieve.data.reverse();
        } else {
          this.notificationService.addError(
            `${receieve.data}. ${receieve.message}`,
            `Unable to get transactions`
          );
        }
      },
      error => {
        this.notificationService.addError(error, `Unable to get transactions`);
      }
    );
  }
}
