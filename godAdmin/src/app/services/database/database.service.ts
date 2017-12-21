import { Injectable } from '@angular/core';
import { DbConfig } from './db.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getList(entity: string) {
    return this.http.get(`${DbConfig.baseUrl}/${entity}`).toPromise();
  }

  getOne(entity: string, id) {
    return this.http.get(`${DbConfig.baseUrl}/${entity}/${id}`).toPromise();
  }

  add(entity: string, object) {
    return this.http.post(`${DbConfig.baseUrl}/${entity}`, object).toPromise();
  }

  delete(entity: string, id) {
    return this.http.delete(`${DbConfig.baseUrl}/${entity}/${id}`).toPromise();
  }

  update(entity: string, object) {
    return this.http.post(`${DbConfig.baseUrl}/${entity}/${object.id}`, object).toPromise();
  }
}