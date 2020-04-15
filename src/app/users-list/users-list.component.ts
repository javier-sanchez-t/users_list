import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { AppConfigService } from '../services/app-config.service';
import { Employee } from '../model/Employee';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faSearch, faEye, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  faSearchIcon = faSearch;
  faEyeIcon = faEye;
  faChevronRightIcon = faChevronRight;
  faChevronLeftIcon = faChevronLeft;
  lastName: string = "";
  firstName: string = "";
  userPrincipalName: string = "";
  skip: number = 0;
  limit: number = 0;
  page: number = 0;
  employees: any = [];
  employeeDescription: Employee;
  displayedColumns: string[] = ['lastName', 'firstName', 'userPrincipalName', 'officePhone', 'mobilePhone'];
  errorList:any = "";
  errorDetail:any = "";

  constructor(private employeeService: EmployeeService, private modalService: NgbModal, private config: AppConfigService) {
    this.getEmployees();
    this.limit = this.config.tableRows;
  }

  ngOnInit(): void { }

  searchEmployees(){
    this.skip = 0;
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees(this.lastName, this.firstName, this.userPrincipalName, this.skip, this.limit).subscribe(results => {
      this.employees = results;
    }, error => {
      this.errorList = error;
      console.log("ERROR: ", error);
    });
  }


  getEmployeeDescription(employeeId: string, content) {
    this.employeeService.getEmployeeDescription(employeeId).subscribe(result => {
      this.employeeDescription = result;
      this.modalService.open(content, { centered: true });
    }, error => {
      this.errorDetail = error;
      console.log("ERROR: ", error);
    });
  }


  nextPage() {
    this.page = this.page + 1;
    this.skip = this.page * this.limit;
    this.getEmployees();
  }

  previousPage() {
    this.page = this.page - 1;
    this.skip = this.page * this.limit;
    this.getEmployees();
  }

}
