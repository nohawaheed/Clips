import { Component } from '@angular/core';
import { Modal } from '../../shared/modal/modal';
import { TabsContainer } from "../../shared/tabs-container/tabs-container";
import { Tab } from "../../shared/tab/tab";
import { Login } from "../login/login";
import { Register } from "../register/register";

@Component({
  selector: 'app-auth-modal',
  imports: [Modal, TabsContainer, Tab, Login, Register],
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.css',
})
export class AuthModal { }
