import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/service/cart.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [],
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }
  onCheckout(): void {
    this.http
      .post('http://localhost:4242/checkout', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          'pk_test_51LsWN6JdNbzwaE2LffNX6U2I0wtjclKJ7NUiWDDIhjtmaeVXXGNmTxJfo7ab0mNbm1y5sLZfhCHfkQgFJOs9Cpk60033sUu3Af'
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
  onClearCart(): void {
    this.cartService.onClearCart();
  }
  removeItemsType(item: CartItem): void {
    this.cartService.removeItemsType(item);
  }
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
}
