import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
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
  @Input() value: string | number = 0;
  @Output() valueEmitter: EventEmitter<string | number>;
  @Input() device_type: DeviceType = 'switch';
  @Output() onUpdate: EventEmitter<any>;


  constructor() {
    this.stateEmitter = new EventEmitter();
    this.valueEmitter = new EventEmitter();
    this.onUpdate = new EventEmitter();
  }

  ngOnInit(): void {
  }

  stateToggle() {
    this.state = !this.state;
    this.stateEmitter.emit(this.state);
    this.onUpdate.emit({
      chip_id: this.chip_id,
      state: this.state,
      value: this.value
    });
  }

  valueChange(data: number | null) {
    if (data === null) return;
    this.valueEmitter.emit(this.value);

    this.onUpdate.emit({
      chip_id: this.chip_id,
      state: this.state,
      value: this.value
    });

  }

  onInput(data: MatSliderChange) {
    this.value = data.value as number | string;
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
