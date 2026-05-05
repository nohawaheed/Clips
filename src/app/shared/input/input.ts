import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './input.html',
  styleUrl: './input.css',
  providers: [provideNgxMask()]
})
export class Input {
  control = input.required<FormControl>();
  type = input("text");
  placeholder = input("");
  // prevent the ngxmask from working by setting the value to empty string
  format = input('');
}
