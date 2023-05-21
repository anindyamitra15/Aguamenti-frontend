import { Component, OnInit, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Schedule } from 'src/app/dtos/api.dtos';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Input() schedule: Schedule | undefined;
  repeat_time?: string;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    if (this.schedule?.repeat_time != undefined)
      this.repeat_time = new Date(this.schedule.repeat_time)
        .toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  enableDisableSchedule(value: MatSlideToggleChange) {
    // fire an api call
    console.log(value.checked);
    this.api
      .editSchedule({ _id: this.schedule?._id as string, enabled: value.checked })
      .subscribe(d => console.log(d.code, d.message));
  }

}
