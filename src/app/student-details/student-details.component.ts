import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../_models/student';
import { StudentService } from '../_services/student.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  id: number
  student: Student;

  constructor(private route: ActivatedRoute, private studentService: StudentService,
    private _location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.student = new Student();
    this.studentService.getStudent(this.id).subscribe( data => {
      this.student = data;
    });
  }

  goBack() {
    this._location.back();
  }

}
