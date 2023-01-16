import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  public dialogProduct: Product;
  public quantity: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.dialogProduct = this.productService.filterdata;
  }

  ngOnInit(): void {
    this.dialogProduct = this.productService.filterdata;
  }
  onAddToCart(quantity: number): void {
    if (quantity) {
      this.cartService.addToCart({
        //image: this.dialogProduct.imageUrl,
        image: this.dialogProduct.image,
        name: this.dialogProduct.title,
        price: this.dialogProduct.price,
        quantity: quantity,
        id: this.dialogProduct.id,
      });
    } else {
      console.log('no 0s');
    }
  }
}
