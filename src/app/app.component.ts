import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgotpassword/forgotpassword.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, ForgotPasswordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EvalTrack_Frontend';
}
