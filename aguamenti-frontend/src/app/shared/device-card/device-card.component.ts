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
  @Input() value!: string;
  @Input() device_type!: DeviceType;

  constructor() {
    this.name = '';
    this.state = '';
    this.value = '';
    this.device_type = 'switch';
  }

  ngOnInit(): void {
  }

}
