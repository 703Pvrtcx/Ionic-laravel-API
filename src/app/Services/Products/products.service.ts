import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../Pages/Product/products/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  editProduct: boolean;

  apiUrl ='i703-partco-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {
    this.editProduct=false;
   }
  // Get all products from the API
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
  getProduct(productId: number): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/products/${productId}`);
  }
  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.apiUrl}/products`,product);
  }
  updateProduct(productId: number, product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/products/${productId}`,product);
  }
  deleteProduct(productId: number): Observable<Product>{
    return this.http.delete<Product>(`${this.apiUrl}/products/${productId}`);
  }
}
