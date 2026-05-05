import { Component, inject, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Alert } from '../../shared/alert/alert';

@Component({
  selector: 'app-login',
  imports: [FormsModule, Alert],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  auth = inject(Auth);
  credentials = {
    email: '',
    password: ''
  };

  showAlert = signal(false);
  alertMsg = signal('Please wait! You are logging you in.');
  alertColor = signal('blue');
  inSubmission = signal(false);

  async login() {
    this.showAlert.set(true);
    this.alertColor.set('blue');
    this.alertMsg.set('Please wait! You are logging you in.');
    try {
      this.inSubmission.set(true);
      await signInWithEmailAndPassword(this.auth, this.credentials.email, this.credentials.password);
    } catch (e: any) {
      this.inSubmission.set(false);
      this.alertColor.set('red');
      if (e.code === "auth/invalid-credential") {
        this.alertMsg.set('Wrong email or password.');
        return;
      }
      this.alertMsg.set('An unexpected error occured! Please try again later.');
      return;
    }
    this.alertMsg.set('Success! You are now logged in.');
    this.alertColor.set('green');
  }
}
