import { Component, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  masterService = inject(MasterService);
  router = inject(Router);
  isLoginFormVisible: boolean = true;

  registerObj: any = {
    userId: 0,
    userName: '',
    emailId: '',
    fullName: '',
    role: '',
    createdDate: new Date(),
    password: '',
  };

  showRegister() {
    this.isLoginFormVisible = false;
  }

  onRegister(RegForm: NgForm) {
    this.masterService.onRegister(this.registerObj).subscribe((res: any) => {
      if (res.result) {
        alert('Registered Successfully');
        RegForm.resetForm();
      } else {
        alert(res.message);
      }
    });
  }

  loginObj: any = {
    userName: '',
    password: '',
  };

  showLogin() {
    this.isLoginFormVisible = true;
  }

  onLogin(LgnForm: NgForm) {
    this.masterService.onLogin(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        LgnForm.resetForm();
        localStorage.setItem('complaintUser', JSON.stringify(res.data));
        this.router.navigateByUrl('/dashboard');
      } else {
        alert(res.message);
      }
    });
  }
}
