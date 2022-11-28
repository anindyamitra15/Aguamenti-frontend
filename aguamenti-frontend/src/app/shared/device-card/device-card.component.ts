import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceType } from 'src/app/dtos/deviceTypes';

@Component({
  selector: 'device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent implements OnInit {

  @Input() name: string = 'My device';
  @Input() state: boolean = true;
  @Output() stateEmitter: EventEmitter<boolean>;
  @Input() value: string | number = 69;
  @Output() valueEmitter: EventEmitter<string | number>;
  @Input() device_type: DeviceType = 'switch';

  stateBtnStyle = {
    color: ''
  };

  constructor() {
    this.stateEmitter = new EventEmitter();
    this.valueEmitter = new EventEmitter();
  }

  ngOnInit(): void {
    this.stateBtnStyle.color = this.state ? '#5d85f5' : '#ff4e4e';
  }

  stateToggle() {
    this.state = !this.state;
    this.stateBtnStyle.color = this.state ? '#5d85f5' : '#ff4e4e';
    this.stateEmitter.emit(this.state);
  }

  getValue() {
    if (typeof this.value === 'number') {
      return `${this.value}%`;
    }
    return this.value;
  }

  getCardWidth() {
    switch (this.device_type) {
      case 'switch':
      case 'pump':
        return '180px';
      case 'slider':
      case 'tank_level':
        return '280px';
    }
  }


}
