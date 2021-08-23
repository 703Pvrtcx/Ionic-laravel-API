import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../Pages/Product/products/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  editProduct: boolean;

  apiUrl ='http://localhost:8000/api';

  constructor(private http: HttpClient) {
    this.editProduct=false;
   }
  // Get all products from the API
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
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
