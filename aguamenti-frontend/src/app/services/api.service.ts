import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { GenericApiResponse, HttpHeaderOptions } from '../dtos/api.dtos';
import { USER_TOKEN } from '../dtos/cookie-fields';
import { from, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { DeviceType } from '../dtos/deviceTypes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getHttpOptions(authorized: boolean = false): HttpHeaderOptions {
    if (authorized)
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.cookie.get(USER_TOKEN)}`,
        }),
      };
    else
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
  }

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  login(body: {
    email: string,
    password: string
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/users/login`;
    return this.http
      .post<GenericApiResponse>(url, body, this.getHttpOptions())
      .pipe(
        tap(
          {
            next: (data: GenericApiResponse) => {
              if (data.result) {
                this.cookie.set(USER_TOKEN, data.result.token);
              }
            },
            error: (err: any) => console.log(err)
          }
        )
      );
  }

  register(body: {
    name: string,
    email: string,
    password: string
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/users/register`;
    return this.http
      .post<GenericApiResponse>(url, body, this.getHttpOptions())
      .pipe(
        tap(
          {
            next: (data: GenericApiResponse) => {
              if (data.result) {
                this.cookie.set(USER_TOKEN, data.result.token);
              }
            },
            error: (err: any) => console.log(err)
          }
        )
      );
  }

  getAllDevices(body: {
    house_id: string
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/device/house-snapshot/${body.house_id}`;
    return this.http
      .get<GenericApiResponse>(url, this.getHttpOptions(true));
  }

  getAllHouses(): Observable<GenericApiResponse> {
    const url = `${environment.uri}/user/all-houses`;
    return this.http
      .get<GenericApiResponse>(url, this.getHttpOptions(true));
  }

  createHouse(body: {
    name: string
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/house/create`;
    return this.http
      .post<GenericApiResponse>(url, body, this.getHttpOptions(true));
  }

  deleteHouse(body: {
    house_id: string
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/house/delete`;
    return this.http
      .post<GenericApiResponse>(url, body, this.getHttpOptions(true));
  }

  renameHouse(body: {
    name: string,
    house_id: string
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/house/update`;
    return this.http
      .put<GenericApiResponse>(url, body, this.getHttpOptions(true));
  }

  changeHouseOwnership(body: {
    owner_id: string,
    house_id: string
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/house/change-owner`;
    return this.http
      .put<GenericApiResponse>(url, body, this.getHttpOptions(true));
  }

  addUserToHouse(body: {
    house_id: string,
    user_id: string,
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/house/add-user`;
    return this.http
      .post<GenericApiResponse>(url, body, this.getHttpOptions(true));
  }

  removeUserFromHouse(body: {
    house_id: string,
    user_id: string,
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/house/remove-user`;
    return this.http
      .post<GenericApiResponse>(url, body, this.getHttpOptions(true));
  }

  addDeviceToHouse(body: {
    house_id: string,
    chip_id: string,
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/house/add-device`;
    return this.http
      .post<GenericApiResponse>(url, body, this.getHttpOptions(true));
  }


  removeDeviceFromHouse(body: {
    chip_id: string,
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/house/remove-device`;
    return this.http
      .post<GenericApiResponse>(url, body, this.getHttpOptions(true));
  }

  createDevice(body: {
    name: string,
    chip_id: string,
    device_type: DeviceType,
    house_id?: string,
    pump_chip_id?: string
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/device/create`;
    return this.http
      .post<GenericApiResponse>(url, body, this.getHttpOptions(true));
  }

  editDevice(body: {
    chip_id: string,
    name?: string,
    house_id?: string,
    device_type?: DeviceType,
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/device/update`;
    return this.http
      .post<GenericApiResponse>(url, body, this.getHttpOptions(true));
  }

  moveDeviceToNewHouse(body: {
    house_id: string,
    device_id?: string,
    chip_id?: string
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/device/change-house`;
    return this.http
      .post<GenericApiResponse>(url, body, this.getHttpOptions(true));
  }

  linkPumpToTankUnit(body: {
    house_id: string,
    chip_id: string,
    pump_chip_id: string
  }): Observable<GenericApiResponse> {
    const url = `${environment.uri}/device/link-pump`;
    return this.http
      .post<GenericApiResponse>(url, body, this.getHttpOptions(true));
  }

}
