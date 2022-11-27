import { Component, Input, OnInit } from '@angular/core';
import { DeviceType } from 'src/app/dtos/deviceTypes';

@Component({
  selector: 'device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent implements OnInit {

  @Input() name!: string;
  @Input() state!: string;
  @Input() value!: string | number;
  @Input() device_type!: DeviceType;

  constructor() {
    this.name = 'My device';
    this.state = '';
    this.value = 69;
    this.device_type = 'switch';
  }

  ngOnInit(): void {
  }

  getValue()
  {
    if(typeof this.value === 'number'){
      return `${this.value} %`;
    }
    return this.value;
  }

}
