import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WalletService {
  constructor(private http: HttpClient) { }

  rpcEndpoint = 'http://localhost:3000/api/rpc';

  getBalance(rpcData){

    const token = localStorage.getItem('token');

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token,
      })
    };

    return this.http.post(this.rpcEndpoint, rpcData, httpOptions);
  }
}
