import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WalletService {
  constructor(private http: HttpClient) { }

  apiEndpoint = 'https://localhost:3000/api/';
  rpcEndpoint = this.apiEndpoint + 'rpc';

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

  getNewAddress() {
    return 'n4Li1jNYkCy82wKrrbwyFRkEtixG2WV678';
  }

  sendAPI(endpoint, params) {

    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token,
      })
    };

    return this.http.post(this.apiEndpoint + endpoint, params, httpOptions);
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
