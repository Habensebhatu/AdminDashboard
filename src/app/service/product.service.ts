import { Injectable } from '@angular/core';
import { Product } from '../class/class';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  productsUpdated = new Subject<Product[]>();
  private readonly apiUrl = 'https://localhost:7087/api/Product';
  constructor(private http: HttpClient) { }

  setProducts(productData: FormData): Observable<Product> {
    console.log("productData", productData)
    return this.http.post<Product>(this.apiUrl, productData);
}

addProductToCache(product: Product): void {
  this.products.push(product);
  this.productsUpdated.next([...this.products]);
}

  getProducts(): Observable<Product[]>{
 const observable = this.http.get<Product[]>(this.apiUrl);
  observable.subscribe({
    next: pruducts => {
      this.products = pruducts;
    },
    error: error => {
      console.error('Error getting categories: ', error);
    }
  });

  return observable;
  }


  removeProducts(product: Product): Observable<Product>  {
    return this.http.delete<Product>(`${this.apiUrl}/${product.productId}`);
  }
  
  updateProduct(formData: FormData) {
    return this.http.put<Product>(this.apiUrl, formData);
  }
   
}
