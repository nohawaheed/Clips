import { AfterViewInit, Component, ElementRef, inject, input, OnDestroy, viewChild } from '@angular/core';
import { ModalService } from './../../services/modal';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal implements AfterViewInit, OnDestroy {
  modal = inject(ModalService);
  id = input.required<string>();
  dialog = viewChild.required<ElementRef<HTMLDialogElement>>("baseDialog");


  ngAfterViewInit(): void {
    this.modal.register(this.id(), this.dialog().nativeElement);
  }
  ngOnDestroy(): void {
    this.modal.unregister(this.id());
  }
}
