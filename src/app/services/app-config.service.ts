import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public employeesUrlApi: string;
  public employeeDescriptionUrlApi: string;
  public tableRows: number;

  constructor(private http: HttpClient) {

  }


  load(): Promise<any> {
    const promise = this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
        Object.assign(this, data);
        return data;
      });

    return promise;
  }


}
