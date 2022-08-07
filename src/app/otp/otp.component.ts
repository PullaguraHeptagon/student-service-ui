import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OtpService } from '../_services/otp.service';
import { AccountService, AlertService } from '../_services';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(private optService: OtpService,private router: Router,
    private alertService: AlertService, private accountService: AccountService) { }

   otp: any; 
   formdata: any;
   isOTPGenerated: boolean = false;
   otpSuccessMessage: any;

   ngOnInit() { 
    this.generateOTP();
    this.formdata = new FormGroup({ 
      otp: new FormControl(null)
    }); 
   }
   
   async generateOTP() {
    const response = await this.optService.generateOTP().toPromise();
    if (response && response.message) {
      console.log(response);
      this.otpSuccessMessage = response.message;
      this.isOTPGenerated = true;
    }
   }

   async validateOTP(otp: any) {
    this.otp = otp;
    console.log(this.otp);
    const response = await this.optService.validateOTP(otp['otp']).toPromise();
    if (response && response.message) {
      if(response.message === 'OTP Validated Successfully') {
        this.optService.isOTPLoginSuccess.next(true);
        this.otpSuccessMessage = response.message;
        setTimeout(() => {
          console.log('sleep');
          this.router.navigate(['/']);
        }, 1000);
      } else {
        this.otpSuccessMessage = response.message + '..Please login again..';
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.accountService.userSubject.next(null);
        setTimeout(() => {
          console.log('sleep');
          this.router.navigate(['/account/login']);
        }, 1000);
      }
    }
  }

}
