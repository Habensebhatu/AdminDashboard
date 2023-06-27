import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/class/class';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router: Router, private productService: ProductService) {}
  
  displayedColumns: string[] = [
    'product',
    'name',
    'category',
    'price',
    'action',
  ];

  dataSource: Product[] = [];
 
  ngOnInit(): void {
    this.dataSource = this.productService.getProducts();
  }

  addProduct(): void {
    this.router.navigate(['/add-product']);
  }
}
