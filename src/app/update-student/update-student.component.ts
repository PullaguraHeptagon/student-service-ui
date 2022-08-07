import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../_models/student';
import { StudentService } from '../_services/student.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  id: number;
  student: Student = new Student();

  constructor(private studentService: StudentService,
              private router: Router,
              private route: ActivatedRoute,
              private _location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.studentService.getStudent(this.id).subscribe((data) => {
      this.student = data;
    });
  }

  goBack() {
    this._location.back();
  }

  onSubmit(){
    this.studentService.updateStudent(this.id, this.student).subscribe((data) =>{
      this.getStudentList();
    });
  }

  getStudentList(){
    this.router.navigate(['/getStudents']);
  }

}
