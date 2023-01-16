import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: [],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
