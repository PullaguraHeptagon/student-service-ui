import { Component, OnInit } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { OtpService } from './_services/otp.service';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit{
    user: User;
    isOTPLoginSuccess: boolean = false;
    isOTPEnabled: boolean = false;

    constructor(private accountService: AccountService,
        private otpService: OtpService) {
        this.accountService.user.subscribe(x => this.user = x);
    }
    ngOnInit(): void {
        this.otpService.isOTPLoginSuccess.subscribe((response) => {
            this.isOTPLoginSuccess = response;
        });
        this.accountService.isOTPEnabled.subscribe((response) => {
            this.isOTPEnabled = response;
        });
    }

    logout() {
        this.accountService.logout();
    }

    showOrHide() {
        let show = false;
        if (this.user && this.isOTPLoginSuccess) {
            show = true;
        } else if(this.user && !this.isOTPEnabled) {
            show = true;
        }
        return show;
    }
}