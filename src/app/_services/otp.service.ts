import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  private baseUrl = 'http://localhost:8080/otp';

  public isOTPLoginSuccess = new BehaviorSubject<boolean>(false);

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

  generateOTP(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'/generateOtp', this.requestOptions);
  }

  validateOTP(otp: any): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'/validateOtp?otpnum='+otp, this.requestOptions);
  }
}
