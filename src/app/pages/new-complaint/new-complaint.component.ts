import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-complaint',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-complaint.component.html',
  styleUrl: './new-complaint.component.css',
})
export class NewComplaintComponent implements OnInit {
  masterService = inject(MasterService);
  parentDepartmentList: any[] = [];
  childDepartmentList: any[] = [];
  parentDepartmentID: number = 0;

  complaintObj: any = {
    complaintId: 0,
    userId: 0,
    createdDate: new Date(),
    childDeptId: 0,
    complaintTitle: '',
    complaintNo: '',
    complaintDetails: '',
    isAlreadyReportedThis: false,
    oldComplaintNo: '',
    complaintStatusId: 0,
  };

  ngOnInit(): void {
    this.loadParentDepartment();

    const localData = localStorage.getItem('complaintUser');
    if (localData !== null) {
      this.complaintObj.userId = JSON.parse(localData).userId;
    }
  }

  loadParentDepartment() {
    this.masterService
      .getParentDepartment()
      .pipe(
        catchError((err) => {
          console.error('Error Loading parent data', err);
          return throwError(() => err);
        })
      )
      .subscribe((res: any) => {
        this.parentDepartmentList = res.data;
      });
  }

  getChildDepartment() {
    this.masterService
      // test purpose use 1 or 2
      // .getChildDepartmentwithParentId(this.parentDepartmentID)
      .getChildDepartmentwithParentId(2)
      .pipe(
        catchError((err) => {
          console.error('Error Loading child department data', err);
          return throwError(() => err);
        })
      )
      .subscribe((res: any) => {
        this.childDepartmentList = res.data;
      });
  }

  onSubmitComplaint() {
    this.masterService
      .CreateNewComplaint(this.complaintObj)
      .subscribe((res: any) => {
        if (res.result) {
          alert('Complaint Created');
        } else {
          alert(res.message);
        }
      });
  }
}
