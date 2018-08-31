import { Component, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';

import { EventEmitter } from '@angular/core';

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
