import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from '../../shared/data.service';
import { Student } from 'src/app/model/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {
  studentsList: Student[] = [];
  studentListSubscription!: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAllStudents();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  getAllStudents() {
    this.studentListSubscription = this.dataService.getAllStudents().subscribe(res => {
      this.studentsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      }, (err: any) => {
        alert('Error while fetching students list' + err.message);
      })
    })
  }

  deleteStudent(student: Student) {
    if (window.confirm('Are you sure you want to delete ' + student.first_name + ' ' + student.last_name + ' ?')) {
      this.dataService.deleteStudent(student);
    }
  }

  unsubscribe() {
    this.studentListSubscription.unsubscribe()
  }

}
