import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'app/fluxograma/fluxograma.component';
import { AuthenticationService } from 'app/services/authentication.service';




@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    invalidLogin = false

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public dialogRef: MatDialogRef<LoginComponent>,
        private loginservice: AuthenticationService,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
       
       
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/home'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        (this.loginservice.authenticate(this.f.username.value, this.f.password.value).subscribe(
            data => {
              this.router.navigate([''])
              this.invalidLogin = false
            },
            error => {
              this.invalidLogin = true
      
            }
          )
          );
        }
}