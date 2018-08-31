import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WalletService {
  constructor(private http: HttpClient) { }

  rpcEndpoint = 'http://localhost:3000/api/rpc';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  getBalance(rpcData){
    return this.http.post(this.rpcEndpoint, rpcData, this.httpOptions);
  }
}
