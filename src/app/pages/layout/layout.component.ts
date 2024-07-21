import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  loggedInUser: any;
  router = inject(Router);

  constructor() {
    const localData = localStorage.getItem('complaintUser');
    if (localData != null) {
      this.loggedInUser = JSON.parse(localData);
    }
  }

  logoff() {
    localStorage.removeItem('complaintUser');
    this.router.navigateByUrl('/login');
  }
}
