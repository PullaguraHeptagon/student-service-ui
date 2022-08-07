import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../_models/student';
import { StudentService } from '../_services/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  student: Student = new Student();

  constructor(private studentService: StudentService,
              private router: Router) { }

  ngOnInit() {
  }

  addStudent(){
    this.studentService.createStudent(this.student).subscribe( data =>{
      this.getStudentList();
    });
  }

  getStudentList(){
    this.router.navigate(['/getStudents']);
  }
  
  onSubmit(){
    this.addStudent();
  }

}
