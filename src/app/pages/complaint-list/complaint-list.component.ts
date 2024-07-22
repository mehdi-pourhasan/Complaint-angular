import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-complaint-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './complaint-list.component.html',
  styleUrl: './complaint-list.component.css',
})
export class ComplaintListComponent implements OnInit {
  loggedInUser: any;
  masterService = inject(MasterService);
  complaintLists: any[] = [];
  complaintObj: any = {};

  ngOnInit(): void {
    debugger;
    const localData = localStorage.getItem('complaintUser');
    if (localData !== null) {
      this.loggedInUser = JSON.parse(localData);
      if (this.loggedInUser.role === 'admin') {
        this.getAllComplaints();
      } else {
        this.getAllComplaintsByUserId(this.loggedInUser.userId);
      }
    }
  }

  getAllComplaints() {
    debugger;
    this.masterService.getAllComplaints().subscribe((res: any) => {
      this.complaintLists = res.data;
    });
  }

  getAllComplaintsByUserId(id: number) {
    debugger;
    this.masterService.getAllComplaintsByUserId(id).subscribe((res: any) => {
      this.complaintLists = res.data;
    });
  }

  openModal(data: any) {
    this.complaintObj = data;
    const modal = document.getElementById('myModal');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('myModal');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }
}
