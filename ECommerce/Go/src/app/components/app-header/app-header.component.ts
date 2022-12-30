import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { User, UserArray } from 'src/app/models/user.model';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { CartService } from 'src/app/service/cart.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
})
export class AppHeaderComponent implements OnInit {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  displayedColumns = ['product', 'quantity', 'price'];
  public LoggedIn: boolean = false;
  loggedUser: string | undefined;

  @Input()
  get cart(): Cart {
    return this._cart;
  }
  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  constructor(
    private cartService: CartService,
    public loginService: LoginService,
    public home: HomeComponent
  ) {}

  ngOnInit(): void {
    this.loginService.isLogged.subscribe((response) => {
      this.LoggedIn = response;
    });
    this.loginService.loggedUser?.subscribe((data) => (this.loggedUser = data));
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  onClearCart(): void {
    this.cartService.onClearCart();
  }
  Logout(): void {
    this.loginService.logout();
  }
  showCategoriesChange(): void {
    if (this.home.showCategories) this.home.showCategories = false;
    else this.home.showCategories = true;
  }
}
