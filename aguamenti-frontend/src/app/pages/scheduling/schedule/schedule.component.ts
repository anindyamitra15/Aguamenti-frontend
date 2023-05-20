import { Component, OnInit, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Schedule } from 'src/app/dtos/api.dtos';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Input() schedule: Schedule | undefined;
  repeat_time?: string;

  constructor() { }

  ngOnInit(): void {
    if (this.schedule?.repeat_time != undefined)
      this.repeat_time = new Date(this.schedule.repeat_time)
        .toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  enableDisableSchedule(value: MatSlideToggleChange) {
    // fire an api call
    console.log(value.checked);
  }

}
