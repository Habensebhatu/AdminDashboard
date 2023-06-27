import { Injectable } from '@angular/core';
import { Product } from '../class/class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  setProducts(product: Product): void {
    let products = this.getProducts();
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }

  getProducts(): Product[] {
    let products = localStorage.getItem('products');
    if (products) {
      return JSON.parse(products);
    } else {
      return [];
    }
  }
}
