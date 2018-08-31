import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExplorerModel } from './explorer.model';

@Injectable()
export class ExplorerService {
  constructor(private http: HttpClient) { }

  tickerUSD = 'https://chainz.cryptoid.info/nav/api.dws?q=ticker.usd';
  tickerBTC = 'https://chainz.cryptoid.info/nav/api.dws?q=ticker.btc';

  getUSD() {
    return this.http.get(this.tickerUSD);
  }
  getBTC() {
    return this.http.get(this.tickerBTC);
  }
}
