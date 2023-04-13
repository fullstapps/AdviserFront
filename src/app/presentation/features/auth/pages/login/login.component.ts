import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/data/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: UntypedFormGroup;
  isErrors = {
    form: false,
    back: false,
  };
  isLoading = false;
  subscriptionRequest: Subscription;
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }
  ngOnInit() {}

  onSubmitForm() {
    this.isLoading = true;
    this.isErrors = {
      form: false,
      back: false,
    };
    const controls = this.loginForm.controls;
    /** check form */
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.isLoading = false;
      this.isErrors['form'] = true;
      return;
    }
    const data = { ...this.loginForm.value };
    this.subscriptionRequest = this._authService.login(data).subscribe({
      next: (response) => {
        localStorage.setItem('adviser.token', response.token);
        this._router.navigateByUrl('/');
        this.isLoading = false;
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
