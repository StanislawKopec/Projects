import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductCategory } from 'src/app/models/productCategory.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  @Output() allProducts: EventEmitter<Array<Product>> = new EventEmitter();

  categoriesSubscription: Subscription | undefined;
  categoriesString: Array<string> = [];
  categories: Array<ProductCategory> | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.productService
      .getCategories()
      .subscribe((response) => {
        for (let i = 0; i < response.length; i++) {
          this.categoriesString.push(response[i].toString());
          //this.categoriesString.push(response[i].name);
        }
      });
  }
  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
  callAllProducts() {
    this.allProducts.emit();
  }
}
