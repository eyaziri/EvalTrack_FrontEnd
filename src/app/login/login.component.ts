import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['student', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const role = this.loginForm.get('role')?.value;
      if (role === 'student') {
        this.router.navigate(['/etudiant-page-accueil']);
      } else if (role === 'admin') {
        this.router.navigate(['/admin-acceuil']);
      } else {
        alert('Rôle non valide');
      }
    }
  }
}
