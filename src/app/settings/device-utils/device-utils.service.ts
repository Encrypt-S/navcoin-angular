import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DeviceUtilsService {
  constructor(
    private http: HttpClient
  ) {}

  updateUiEndpoint = '/util/update-ui';
  rebootEndpoint = '/util/reboot';

  update(uIPasswordForm){

    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token,
      })
    };

    return this.http.post(this.updateUiEndpoint, uIPasswordForm, httpOptions);
  }

  restart(uIPasswordForm){

    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token,
      })
    };

    return this.http.post(this.rebootEndpoint, uIPasswordForm, httpOptions);
  }

}
