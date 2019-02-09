import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UiPasswordService {
  constructor(
    public jwtHelper: JwtHelperService,
    private http: HttpClient
  ) {}

  authEndpoint = 'https://localhost/api/ui-password';

  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  update(uIPasswordForm){
    return this.http.post(this.authEndpoint, uIPasswordForm, this.httpOptions);
  }

}
