import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./core/nav/nav";
import { AuthModal } from "./user/auth-modal/auth-modal";
import { AuthService } from './services/auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, AuthModal, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('clips');
  auth = inject(AuthService);
}
