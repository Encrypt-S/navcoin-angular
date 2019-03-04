import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RpcSend } from '../rpc/rpc-send.model';

@Injectable()
export class WalletService {
  constructor(private http: HttpClient) {}

  apiEndpoint = 'https://localhost/api/';
  rpcEndpoint = this.apiEndpoint + 'rpc';
  batchRpcEndpoint = this.rpcEndpoint + '/batch';

  sendRPC(rpcData: RpcSend) {
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };

    return this.http.post(this.rpcEndpoint, rpcData, httpOptions);
  }

  sendBatchRPC(rpcData: Array<RpcSend>) {
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };

    return this.http.post(this.batchRpcEndpoint, rpcData, httpOptions);
  }

  getNewAddress() {
    return 'n4Li1jNYkCy82wKrrbwyFRkEtixG2WV678';
  }

  sendAPI(endpoint: String, params?: any) {
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };

    return this.http.post(this.apiEndpoint + endpoint, params, httpOptions);
  }
}
