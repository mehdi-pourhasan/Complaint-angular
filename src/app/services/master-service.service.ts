import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MasterServiceService {
  ApiUrl: string = 'https://projectapi.gerasim.in/api/Complaint/';

  constructor(private http: HttpClient) {}

  onLogin(obj: any) {
    return this.http.post(`${this.ApiUrl}login`, obj);
  }

  onRegister(obj: any) {
    return this.http.post(`${this.ApiUrl}AddNewUser`, obj);
  }
}
