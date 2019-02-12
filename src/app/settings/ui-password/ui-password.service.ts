import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UiPasswordService {
  constructor(
    private http: HttpClient
  ) {}

  uiPasswordEndpoint = 'https://localhost/api/ui-password';

  update(uIPasswordForm){

    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token,
      })
    };

    return this.http.post(this.uiPasswordEndpoint, uIPasswordForm, httpOptions);
  }

}
