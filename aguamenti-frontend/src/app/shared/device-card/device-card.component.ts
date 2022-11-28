import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceType } from 'src/app/dtos/deviceTypes';

@Component({
  selector: 'device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent implements OnInit {

  @Input() name: string = 'My device';
  @Input() chip_id: string = '';
  @Input() state: boolean = true;
  @Output() stateEmitter: EventEmitter<boolean>;
  @Input() value: string | number = 69;
  @Output() valueEmitter: EventEmitter<string | number>;
  @Input() device_type: DeviceType = 'switch';
  @Output() onUpdate: EventEmitter<any>;

  stateBtnStyle = {
    color: ''
  };

  constructor() {
    this.stateEmitter = new EventEmitter();
    this.valueEmitter = new EventEmitter();
    this.onUpdate = new EventEmitter();
  }

  ngOnInit(): void {
    this.stateBtnStyle.color = this.state ? '#5d85f5' : '#ff4e4e';
  }

  stateToggle() {
    this.state = !this.state;
    this.stateBtnStyle.color = this.state ? '#5d85f5' : '#ff4e4e';
    this.stateEmitter.emit(this.state);
    this.onUpdate.emit({
      chip_id: this.chip_id,
      state: this.state,
      value: this.value
    });
  }

  getValue() {
    if (typeof this.value === 'number') {
      if (this.value > 100)
        return `${this.value}`;
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
