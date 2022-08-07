import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    isOTPRequired = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            isOTPRequired:[false],
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    async onSubmit() {
        this.accountService.isOTPEnabled.next(this.f.isOTPRequired.value);
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        const loginResponse = await this.accountService.login(this.f.username.value, this.f.password.value).toPromise();
        if (loginResponse && loginResponse.token) {
            console.log('login response came');
            localStorage.setItem('username', loginResponse.username);
            localStorage.setItem('token', loginResponse.token)
            console.log('dfdaf', this.f.isOTPRequired.value);
            if (this.f.isOTPRequired.value) {
                this.router.navigate(['otp']);
            } else {
                this.router.navigate([this.returnUrl]);
            } 
        }
    }
}
