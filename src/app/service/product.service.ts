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

  setProducts(product: Product): Observable<Product>  {
   this.products.push(product);
    this.productsUpdated.next([...this.products]); 
    return this.http.post<Product>(this.apiUrl, product);
  }

  getProducts(): Observable<Product[]>{
    // const products = localStorage.getItem('products');
    // if (products) {
    //   this.products = JSON.parse(products);
    // } 
    //   return [...this.products];
    // return this.http.get<Product[]>(`${this.apiUrl}`);
      const observable = this.http.get<Product[]>(this.apiUrl);

  observable.subscribe({
    next: pruducts => {
      this.products = pruducts;
      console.log("pppprprpr", this.products )
      // localStorage.setItem('categories', JSON.stringify(categories));
    },
    error: error => {
      console.error('Error getting categories: ', error);
    }
  });

  return observable;
  }


  removeProducts(product: Product): Observable<Product>  {
    // let products = this.getProducts();
    // products = products.filter(pro => pro.productId !== product.productId);
    // localStorage.setItem('products', JSON.stringify( products));
    // this.productsUpdated.next( products);
    return this.http.delete<Product>(`${this.apiUrl}/${product.productId}`);
  }
  
  updateProduct(product: Product) {
    // const index = this.products.findIndex(pro => pro.productId === product.productId);
    // if (index !== -1) {
    //   console.log("savekklklklkl")
    //   this.products[index] = product;
    // }
    // console.log("save",[...this.products] )
    // localStorage.setItem('products', JSON.stringify([...this.products]));
    // this.productsUpdated.next([...this.products]);
  
    return this.http.put<Product>(`${this.apiUrl}/${product.productId}`, product);
  }

  
}
