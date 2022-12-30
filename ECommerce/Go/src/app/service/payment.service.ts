import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { IBook, ISession } from '../models/IBook.model';

declare const Stripe: any;
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  baseUrl: string = 'https://goappapi.azurewebsites.net';

  constructor(private http: HttpClient) {}

  requestSession(items: CartItem[]): void {
    this.http
      .post<ISession>(
        this.baseUrl + '/api/payment/create-checkout-session',
        items
      )
      .subscribe((session) => {
        this.redirectToCheckout(session.sessionId);
      });
  }
  redirectToCheckout(sessionId: string) {
    const stripe = Stripe(
      'pk_test_51LsWN6JdNbzwaE2LffNX6U2I0wtjclKJ7NUiWDDIhjtmaeVXXGNmTxJfo7ab0mNbm1y5sLZfhCHfkQgFJOs9Cpk60033sUu3Af'
    );

    stripe.redirectToCheckout({
      sessionId: sessionId,
    });
  }
}
