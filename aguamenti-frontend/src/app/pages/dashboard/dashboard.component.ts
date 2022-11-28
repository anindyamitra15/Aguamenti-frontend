import { Component, OnInit } from '@angular/core';
import { DeviceType } from 'src/app/dtos/deviceTypes';
import { ApiService } from 'src/app/services/api.service';
import io, { Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { USER_TOKEN } from 'src/app/dtos/cookie-fields';

interface Devices {
  [key: string]: {
    chip_id: string,
    name: string,
    device_type: DeviceType,
    state: boolean,
    value: string | number,
    pump_chip_id?: string
  }
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
      .subscribe(data => {
        const deviceArray = data.result.devices;

        deviceArray.forEach((device: any) => {
          this.devices[device.chip_id] = device;
        });
      });

    this.api
      .getHouseDetails({ house_id: '6384df06c1855162430afec8' })
      .subscribe(data => {
        this.house_name = data.result._doc.name;
        this.endpoint = data.result._doc.endpoint;
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
          this.devices[data.chip_id].state = data.state;
          this.devices[data.chip_id].value = data.value;
        });
      });
  }

  onChange(event: any) {
    this.socket?.emit("from_ui", event);
  }

}
