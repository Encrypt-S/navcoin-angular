import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WalletUtilsService {
  constructor(
    private http: HttpClient
  ) {}

  updateDaemonEndpoint = '/util/update-daemon';
  backupEndpoint = '/util/backup-wallet';
  importEndpoint = '/util/import-wallet';
  restartEndpoint = '/util/restart-daemon';

  update(walletUtilsForm){

    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token,
      })
    };

    return this.http.post(this.updateDaemonEndpoint, walletUtilsForm, httpOptions);
  }

  restart(walletUtilsForm){

    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token,
      })
    };

    return this.http.post(this.restartEndpoint, walletUtilsForm, httpOptions);
  }

  backup(walletUtilsForm){

    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token,
      }),
    };

    return this.http.post(this.backupEndpoint, walletUtilsForm, {...httpOptions, responseType: 'blob'});
  }

  import(walletUtilsForm){

    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token,
      })
    };

    return this.http.post(this.importEndpoint, walletUtilsForm, httpOptions);
  }


}
