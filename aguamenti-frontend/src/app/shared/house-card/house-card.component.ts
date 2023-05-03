import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.scss']
})
export class HouseCardComponent implements OnInit {

  @Input() name: string = 'My House';
  @Output() clickEmitter: EventEmitter<any>;

  constructor() {
    this.clickEmitter = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onClick() {
    this.clickEmitter.emit(0);
  }

}
