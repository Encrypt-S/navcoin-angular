import { Component, OnInit } from '@angular/core';

import { LoginModel } from '../login/login.model';
import { AuthService } from '../auth/auth.service';
import { AuthReceive } from '../auth/auth-receive.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new LoginModel();
  authReceive: AuthReceive;

  submitted = false;

  constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    console.log('login: ', this.login);

    this.authService.login(this.login)
      .subscribe(
        (receive: AuthReceive) => {
          if (receive.type == 'SUCCESS') {
            localStorage.setItem ('token', receive.token);
            this.router.navigate(['/']);
          } else {
            console.log('error: ', receive);
          }
        }, error => {
          console.log('error: ', error);
        }
      );
  }

}
