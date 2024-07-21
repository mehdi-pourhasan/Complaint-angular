import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  ApiUrl: string = 'https://projectapi.gerasim.in/api/Complaint/';

  constructor(private http: HttpClient) {}

  onLogin(obj: any) {
    return this.http.post(`${this.ApiUrl}login`, obj);
  }

  onRegister(obj: any) {
    return this.http.post(`${this.ApiUrl}AddNewUser`, obj);
  }

  getParentDepartment() {
    return this.http.get(`${this.ApiUrl}GetParentDepartment`);
  }

  getChildDepartmentwithParentId(id: number) {
    return this.http.get(
      `${this.ApiUrl}GetChildDepartmentByParentId?deptId=${id}`
    );
  }

  CreateNewComplaint(obj: any) {
    return this.http.post(`${this.ApiUrl}CreateNewComplaint`, obj);
  }
}
