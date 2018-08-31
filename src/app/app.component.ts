import { Component, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';

import { EventEmitter } from '@angular/core';

//@TODO: store JWT token
//@TODO: parse JWT token when calling API
//@TODO: remvoe console logs
//@TODO: handle errors
//@TODO: lock out the other routes

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  error: any;
  title = 'navpi-angular';

  ngOnInit() {
  }


}
