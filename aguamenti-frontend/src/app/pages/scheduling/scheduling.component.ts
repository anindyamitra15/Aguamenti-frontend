import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit {
  timingSchedules: any[] = [];
  actionSchedules: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getScheduleByUser()
      .pipe(map(p => p.result.schedules))
      .subscribe((schedules: Array<any>) => {
        this.timingSchedules = schedules.filter(s => {
          return s.trigger_type === "timing"
        });

        this.actionSchedules = schedules.filter(s => {
          return s.trigger_type === "action"
        });
      });
  }

}
