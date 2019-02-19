import { Component, OnInit } from '@angular/core';

import { LoginModel } from '../login/login.model';
import { AuthService } from '../auth/auth.service';
import { AuthReceive } from '../auth/auth-receive.model';
import { Router } from '@angular/router';
import { MzToastService } from 'ngx-materialize';

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
    public router: Router,
    private toastService: MzToastService,
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    console.log('login: ', this.login);

    this.authService.login(this.login)
      .subscribe(
        (receive: AuthReceive) => {
          if (receive.type == 'SUCCESS') {
            this.toastService.show('Logged in', 4000, 'green');
            localStorage.setItem ('token', receive.token);
            this.router.navigate(['/']);
          } else {
            console.log('error: ', receive);
            this.toastService.show('Incorrect username or password', 4000, 'red');
            return
          }
        }, error => {
          console.log('error: ', error);
        }
      );
  }

}
