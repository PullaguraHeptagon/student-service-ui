import { Component, OnInit } from '@angular/core';
import { Observable,Subject } from "rxjs";

import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Student } from '../_models/student';
import { StudentService } from '../_services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

 constructor(private studentservice:StudentService, private router: Router) { }

  students: Student[];   
 

  ngOnInit() {
    this.getStudents();
  }

  addStudent() {
    this.router.navigate(['createStudent']);
  }

  getStudents(){
    this.studentservice.getStudentList().subscribe(data => {
      this.students = data;
    });
  }
  
  getStudent(id: number){
    this.router.navigate(['getStudent', id]);
  }

  updateStudent(id: number){
    this.router.navigate(['updateStudent', id]);
  }

  deleteStudent(id: number) {
    this.studentservice.deleteStudent(id).subscribe((data) => {
      console.log(data);
    });
    this.students = this.students.filter(item => item.sid !== id);
  }

}
