import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(
    public jwtHelper: JwtHelperService,
    private http: HttpClient
  ) {}

  authEndpoint = 'http://localhost:3000/api/auth';

  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  //get token from server


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  login(loginForm){
    return this.http.post(this.authEndpoint, loginForm, this.httpOptions);
  }

}
