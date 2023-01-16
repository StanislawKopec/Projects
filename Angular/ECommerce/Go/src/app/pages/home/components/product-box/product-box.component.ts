import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css'],
})
export class ProductBoxComponent implements OnInit {
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();
  public dialogProduct: Product | undefined;

  constructor(
    private dialogRef: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  openDialog() {
    this.dialogProduct = this.product;
    this.productService.filterdata = this.dialogProduct;
    this.dialogRef.open(PopupComponent);
  }
}
