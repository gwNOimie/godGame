import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbConfig } from './db.config';

@Injectable()
export class DronesService {

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get(`${DbConfig.baseUrl}/drones`).toPromise();
  }

  getOne(id) {
    return this.http.get(`${DbConfig.baseUrl}/drones/${id}`).toPromise();
  }
}
