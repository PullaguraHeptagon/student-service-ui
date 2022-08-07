import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private baseUrl = 'http://localhost:8080/api';

  headerDict: any = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer '+localStorage.getItem('token'),
  };

  requestOptions: any = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict), 
  };

  constructor(private http:HttpClient,) { }

  getStudentList(): Observable<any> {
    console.log('Bearer ', localStorage.getItem('token'));
    return this.http.get(`${this.baseUrl}`+'/getStudents', this.requestOptions);
  }

  createStudent(student: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'/addStudent', student, this.requestOptions);
  }

  /*deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteStudent/${id}`, this.requestOptions);
  }*/

  deleteStudent(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/deleteStudent/${id}`);
  }

  getStudent(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getStudent/${id}`, this.requestOptions);
  }

  updateStudent(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateStudent/${id}`, value, this.requestOptions);
  }
  
}                                           