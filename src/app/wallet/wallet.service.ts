import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WalletService {
  constructor(private http: HttpClient) { }

  rpcEndpoint = 'https://localhost/api/rpc';

  sendRPC(rpcData) {

    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token,
      })
    };

    return this.http.post(this.rpcEndpoint, rpcData, httpOptions);
  }
  listTransactions() {
    return true;
  }

  getStakeReport() {
    return true;
  }

  listProposals() {
    return true;
  }

  getNewAddress() {
    return 'n4Li1jNYkCy82wKrrbwyFRkEtixG2WV678';
  }

  getWalletReport() {
    return {
      'wallet_version': 130000,
      'balance': 38320718.47534246,
      'coldstaking_balance': 0.00000000,
      'unconfirmed_balance': 0.00000000,
      'immature_balance': 21494998.04000000,
    };
  }
}

interface WalletReport {
  walletVersion: number;
  balance: number;
  coldstakingBalance: number;
  unconfirmedBalance: number;
  immatureBalance: number;
}

interface CommunityFundReport {
  CFundBalance: number;
  proposals: Array<CFProposal>;
  paymentRequests: Array<CFPaymentRequest>;
}

interface CFProposal {
  amount: number;
  yesVotes: number;
  noVotes: number;
  proposalHash: String;
}
interface CFPaymentRequest extends CFProposal {
  paymentRequestHash: String;
}
