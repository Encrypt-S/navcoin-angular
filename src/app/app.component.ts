import { Component, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { BlockExplorer } from './explorer.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'navpi-angular';
  explorer: BlockExplorer[];
  error: any;

  // modalActions = new EventEmitter<string|MaterializeAction>();
  // openModal() {
  //   this.modalActions.emit({action:"modal",params:['open']});
  // }
  // closeModal() {
  //   this.modalActions.emit({action:"modal",params:['close']});
  // }

  ngOnInit() {
    console.log('OnInit');
  }

}
