import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductCategory } from '../models/productCategory.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'https://localhost:7249/api/products';
  categories: Array<ProductCategory> | undefined;
  categoriesString: Array<string> | undefined;
  constructor(private httpClient: HttpClient) {}

  getAllProducts(category?: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.baseUrl}/${category}?name=${category}`
    );
  }
  getAllProductsAllCategories(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}`);
  }
  getCategories(): Observable<Array<ProductCategory>> {
    return this.httpClient.get<Array<ProductCategory>>(
      'https://localhost:7249/api/products/categories'
    );
  }
}
