import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-clip',
  imports: [],
  templateUrl: './clip.html',
  styleUrl: './clip.css',
})
export class Clip implements OnInit {
  route = inject(ActivatedRoute);
  id = signal('');

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id.set(params['id']);
    });
  }
}
