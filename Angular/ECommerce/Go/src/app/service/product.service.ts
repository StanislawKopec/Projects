import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductCategory } from '../models/productCategory.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'https://goappapi.azurewebsites.net/api';
  categories: Array<ProductCategory> | undefined;
  categoriesString: Array<string> | undefined;
  filterdata: any;

  private _allProductsAllCategories = new BehaviorSubject<boolean>(false);
  public allProductsAllCategories =
    this._allProductsAllCategories.asObservable();

  constructor(private httpClient: HttpClient) {}

  get data(): any {
    return this.filterdata;
  }
  set data(val: any) {
    this.filterdata = val;
  }

  getAllProducts(category?: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `https://fakestoreapi.com/products/category/${category}`
    );
    // return this.httpClient.get<Product[]>(
    //   `${this.baseUrl}/Products/${category}?name=${category}`
    // );
  }
  getAllProductsAllCategories(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`https://fakestoreapi.com/products`);
    // return this.httpClient.get<Product[]>(`${this.baseUrl}/Products`);
  }
  getCategories(): Observable<Array<ProductCategory>> {
    return this.httpClient.get<Array<ProductCategory>>(
      `https://fakestoreapi.com/products/categories`
    );
    // return this.httpClient.get<Array<ProductCategory>>(
    //   `${this.baseUrl}/products/Categories`
    // );
  }
}
