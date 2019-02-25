import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authed: boolean;

  constructor(public auth: AuthService, public router: Router) {
    router.events.subscribe((val) => {
      if (!this.auth.isAuthenticated()) {
        this.authed = false;
      } else {
        this.authed = true;
      }
    });
  }

  ngOnInit() {
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
