import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceType } from 'src/app/dtos/deviceTypes';
import { ApiService } from 'src/app/services/api.service';
import io, { Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { USER_TOKEN } from 'src/app/dtos/cookie-fields';
import { map } from 'rxjs/operators';

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

  devices: Devices = {};
  endpoint: string = '';
  house_name: string = '';
  socket?: Socket;


  constructor(
    private api: ApiService,
    private cookie: CookieService
  ) {

  }

  ngOnInit(): void {
    this.api
      .getAllDevices({ house_id: '6384df06c1855162430afec8' })
      .pipe(map(data => data.result))
      .subscribe(data => {
        const deviceArray = data.devices;
        deviceArray.forEach((device: any) => {
          this.devices[device.chip_id] = device;
        });
      });

    this.api
      .getHouseDetails({ house_id: '6384df06c1855162430afec8' })
      .pipe(map(data => data.result.house))
      .subscribe(data => {
        this.house_name = data.name;
        this.endpoint = data.endpoint;
        this.socket = io(environment.uri, {
          reconnectionDelay: 5000,
          reconnectionDelayMax: 10000,
          extraHeaders: {
            authorization: `Bearer ${this.cookie.get(USER_TOKEN)}`,
          },
          query: { ep: this.endpoint }
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
      });
  }

  ngOnDestroy(): void {
    this.socket?.disconnect();
  }

  onChange(event: any) {
    this.socket?.emit("from_ui", event);
  }

}
