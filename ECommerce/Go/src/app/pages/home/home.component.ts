import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';
@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Array<Product> | undefined;
  cart: Cart = { items: [] };
  category: string | undefined;
  public innerWidth: any;
  columnsNumber = 3;
  display = false;
  public showCategories = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  @HostListener('window:resize')
  onResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 1000) {
      this.columnsNumber = 3;
    } else if (this.innerWidth <= 1000 && this.innerWidth > 700) {
      this.columnsNumber = 2;
    } else if (this.innerWidth <= 700) {
      this.columnsNumber = 1;
    }
    if (this.innerWidth > 500) {
      this.showCategories = false;
    }
  }
  ngOnInit(): void {
    this.getAllProductsAllCategories();
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 1000) {
      this.columnsNumber = 3;
    } else if (this.innerWidth <= 1000 && this.innerWidth > 700) {
      this.columnsNumber = 2;
    } else if (this.innerWidth <= 700) {
      this.columnsNumber = 1;
    }
  }
  getProducts(): void {
    this.productService.getAllProducts(this.category).subscribe((response) => {
      this.products = response;
    });
  }
  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      //image: product.imageUrl,
      image: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }
  getAllProductsAllCategories(): void {
    this.productService.getAllProductsAllCategories().subscribe((response) => {
      this.products = response;
    });
  }
}
