import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal';
import { AuthService } from '../../services/auth';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-nav',
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  modal = inject(ModalService);
  auth = inject(AuthService);

  openModal($event: Event) {
    $event.preventDefault();
    this.modal.toggle("auth");
  }
}

