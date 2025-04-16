import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  showVerificationCode = false;
  showResendLink = false;
  isSubmitting = false;
  isVerifying = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      verificationCode: ['']
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  get verificationCode() {
    return this.forgotPasswordForm.get('verificationCode')!;
    // The ! tells TypeScript you're sure this control exists
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) return;

    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      this.showVerificationCode = true;
      this.showResendLink = true;
      this.isSubmitting = false;
    }, 1000);
  }

  verifyCode() {
    if (this.verificationCode?.invalid) return;

    this.isVerifying = true;
    
    // Simulate verification
    setTimeout(() => {
      this.isVerifying = false;
      this.router.navigate(['/reset-password']); // Redirect to password reset
    }, 1000);
  }

  resendCode() {
    this.isSubmitting = true;
    this.showResendLink = false;
    
    // Simulate resend
    setTimeout(() => {
      this.isSubmitting = false;
      this.showResendLink = true;
    }, 1000);
  }
}