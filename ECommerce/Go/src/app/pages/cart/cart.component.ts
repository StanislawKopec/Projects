import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { IBook } from 'src/app/models/IBook.model';
import { CartService } from 'src/app/service/cart.service';
import { PaymentService } from 'src/app/service/payment.service';

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
  public innerWidth: any;
  strikeCheckout: any = null;
  //$book: Observable<IBook> | undefined;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private paymentService: PaymentService
  ) {}
  @HostListener('window:resize')
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    //this.$book = this.paymentService.getBook();
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  onCheckout(items: CartItem[]): void {
    this.paymentService.requestSession(items);
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
