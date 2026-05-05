import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Input } from '../../shared/input/input';
import { Alert } from "../../shared/alert/alert";
import { AuthService } from '../../services/auth';
import { EmailTaken, Match } from './validators';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, Input, Alert],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  emailTaken = inject(EmailTaken);


  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email], [this.emailTaken.validate]],
    age: [18, [Validators.required, Validators.min(18), Validators.max(120)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]], // Password has at least 8 characters and must contain at least 1 uppercase letter, 1 lowercase letter and 1 number
    confirmPassword: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]]
  }, { validators: [Match('password', 'confirmPassword')] });

  showAlert = signal(false);
  alertMsg = signal('Please wait! Your account is being created.');
  alertColor = signal('blue');
  inSubmission = signal(false);

  async register() {
    this.inSubmission.set(true);
    this.showAlert.set(true);
    this.alertMsg.set('Please wait! Your account is being created.');
    this.alertColor.set('blue');
    try {
      await this.auth.createUSer(this.form.getRawValue());

    } catch (e: any) {
      this.alertColor.set('red');
      this.inSubmission.set(false);
      if (e.code === "auth/email-already-in-use") {
        this.alertMsg.set('Email already exists.');
        return;
      }
      this.alertMsg.set('An unexpected error occured! Please try again later');
      return;
    }
    this.alertMsg.set('Success! Your account has been created.');
    this.alertColor.set('green');
  }
}
