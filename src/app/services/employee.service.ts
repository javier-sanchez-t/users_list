import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private config: AppConfigService) { }

  getEmployees(lastName: string, firstName: string, userPrincipalName: string, skip: number, limit: number): Observable<Employee> {
    let url = `${this.config.employeesUrlApi}?skip=${skip}&limit=${limit}`;

    if (lastName != "") {
      url += `&lastName=${lastName}`;
    }

    if (firstName != "") {
      url += `&firstName=${firstName}`;
    }

    if (userPrincipalName != "") {
      url += `&userPrincipalName=${userPrincipalName}`;
    }

    console.log("REQUEST TO: " + url);
    return this.http.get<Employee>(url);
  }


  getEmployeeDescription(employeeId: string): Observable<Employee> {
    let url = `${this.config.employeeDescriptionUrlApi}${employeeId}`;
    console.log("REQUEST TO: " + url);
    return this.http.get<Employee>(url);
  }
}
