import { Injectable } from '@angular/core';
import { Product } from '../class/class';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  productsUpdated = new Subject<Product[]>();
  constructor() { }

  setProducts(product: Product): void {
   this.products.push(product);
    localStorage.setItem('products', JSON.stringify(this.products));
    this.productsUpdated.next([...this.products]); // This should trigger the update
  }

  getProducts(){
    const products = localStorage.getItem('products');
    if (products) {
      this.products = JSON.parse(products);
    } 
      return [...this.products];
  }

  removeProducts(product: Product) {
    let products = this.getProducts();
    products = products.filter(pro => pro.id !== product.id);
    localStorage.setItem('products', JSON.stringify( products));
    this.productsUpdated.next( products);
  }
  
  updateProduct(product: Product) {
    const index = this.products.findIndex(pro => pro.id === product.id);
    if (index !== -1) {
      console.log("savekklklklkl")
      this.products[index] = product;
    }
    console.log("save",[...this.products] )
    localStorage.setItem('products', JSON.stringify([...this.products]));
    this.productsUpdated.next([...this.products]);
  }
  
}
