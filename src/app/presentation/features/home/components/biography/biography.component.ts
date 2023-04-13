import { Component, EventEmitter, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss'],
})
export class BiographyComponent {
  bioForm: UntypedFormGroup;
  isError: boolean;
  isLoading = false;
  @Output() infoHandler = new EventEmitter();
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _router: Router
  ) {
    this.bioForm = this._formBuilder.group({
      bio: ['', Validators.compose([Validators.required])],
      skills: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmitForm() {
    this.isLoading = true;
    this.isError = false;
    const controls = this.bioForm.controls;
    /** check form */
    if (this.bioForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.isLoading = false;
      this.isError = true;
      return;
    }
    const data = { ...this.bioForm.value };
    this.isLoading = false;
    this.infoHandler.emit(data);
  }
}
