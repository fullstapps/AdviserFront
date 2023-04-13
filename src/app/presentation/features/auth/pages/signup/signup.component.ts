import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/data/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: UntypedFormGroup;
  isLoading: boolean;
  isErrors = {
    form: false,
    back: false,
  };
  subscriptionRequest: Subscription;
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.isLoading = false;
    this.signupForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      agree: ['', Validators.compose([Validators.required])],
    });
  }
  ngOnInit() {}

  onSubmitForm() {
    this.isLoading = true;
    this.isErrors = {
      form: false,
      back: false,
    };
    const controls = this.signupForm.controls;
    /** check form */
    if (this.signupForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.isLoading = false;
      this.isErrors['form'] = true;
      return;
    }
    const data = { ...this.signupForm.value };
    this.subscriptionRequest = this._authService.signUp(data).subscribe({
      next: (response) => {
        this._router.navigateByUrl('/auth/login');
      },
      error: (e) => {
        this.isLoading = false;
        this.isErrors['back'] = true;
      },
    });
  }
  ngOnDestroy() {
    if (this.subscriptionRequest) {
      this.subscriptionRequest.unsubscribe();
    }
  }
}
