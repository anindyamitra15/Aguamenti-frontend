import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceType } from 'src/app/dtos/deviceTypes';
import { ApiService } from 'src/app/services/api.service';
import io, { Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { USER_TOKEN } from 'src/app/dtos/cookie-fields';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

interface Devices {
  [key: string]: {
    chip_id: string,
    name: string,
    device_type: DeviceType,
    state: boolean,
    value: string | number,
  }
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  routeData$: Observable<any>;
  devices: Devices = {};
  socket?: Socket;
  house?: any;

  constructor(
    private api: ApiService,
    private cookie: CookieService,
    private router: Router,
    private store: Store<any>
  ) {
    this.routeData$ = this.store.select('route_data');
  }

  ngOnInit(): void {
    // this.routeData$
    //   .pipe(
    //     switchMap(d => {
    //       return this.api
    //         .getAllDevices({ house_id: d.house })
    //         .pipe(map(data => data.result));
    //     }
    //     )
    //   ).subscribe(data => {
    //     if (!data) return;
    //     const deviceArray = data.devices;
    //     deviceArray.forEach((device: any) => {
    //       this.devices[device.chip_id] = device;
    //     });

    //     this.socket = io(environment.uri, {
    //       reconnectionDelay: 5000,
    //       reconnectionDelayMax: 10000,
    //       extraHeaders: {
    //         authorization: `Bearer ${this.cookie.get(USER_TOKEN)}`,
    //       },
    //       query: { ep: this.house.endpoint }
    //     });

    //     this.socket?.connect();

    //     this.socket?.on('connect', () => {
    //       console.log('connected');
    //     });
    //     this.socket?.on('disconnect', () => {
    //       console.log('disconnected');
    //     });

    //     this.socket?.on('to_ui', (data) => {
    //       console.log(data);

    //       this.devices[data.chip_id].state = data.state;
    //       this.devices[data.chip_id].value = data.value;
    //     });

    //     this.socket?.on('ui_sync', (data) => {
    //       console.log(data);

    //       this.devices[data.chip_id].state = data.state;
    //       this.devices[data.chip_id].value = data.value;
    //     });
    //   });

    this.routeData$.subscribe(d => {
      if (!d.house) {
        this.router.navigate(['/']);
      }
      this.house = d.house;
    });

    if (this.house) {
      this.api
        .getAllDevices({ house_id: this.house._id })
        .pipe(map(data => data.result))
        .subscribe(data => {
          const deviceArray = data.devices;
          deviceArray.forEach((device: any) => {
            this.devices[device.chip_id] = device;

          });
        });

      this.socket = io(environment.uri, {
        reconnectionDelay: 5000,
        reconnectionDelayMax: 10000,
        extraHeaders: {
          authorization: `Bearer ${this.cookie.get(USER_TOKEN)}`,
        },
        query: { ep: this.house.endpoint }
      });

      this.socket?.connect();

      this.socket?.on('connect', () => {
        console.log('connected');
      });
      this.socket?.on('disconnect', () => {
        console.log('disconnected');
      });

      this.socket?.on('to_ui', (data) => {
        console.log(data);

        this.devices[data.chip_id].state = data.state;
        this.devices[data.chip_id].value = data.value;
      });

      this.socket?.on('ui_sync', (data) => {
        console.log(data);

        this.devices[data.chip_id].state = data.state;
        this.devices[data.chip_id].value = data.value;
      });
    }
  }

  ngOnDestroy(): void {
    this.socket?.disconnect();
  }

  onChange(event: any) {
    this.socket?.emit("from_ui", event);
  }

}
