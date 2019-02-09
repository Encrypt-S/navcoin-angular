import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(
    public jwtHelper: JwtHelperService,
    private http: HttpClient
  ) {}

  authEndpoint = 'https://localhost/api/auth';

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

  login(loginForm){
    return this.http.post(this.authEndpoint, loginForm, this.httpOptions);
  }

}
