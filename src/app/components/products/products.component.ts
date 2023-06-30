import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/class/class';
import { ProductService } from 'src/app/service/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy  {

  constructor(private router: Router, private productService: ProductService, public dialog: MatDialog) {}
  
  displayedColumns: string[] = [
    'product',
    'name',
    'category',
    'price',
    'action',
  ];
  productsSubscription: Subscription | undefined;
  dataSource: Product[] = [];
 
  ngOnInit(): void {
    this.dataSource = this.productService.getProducts();
    this.productService.productsUpdated.subscribe(updatedProductes => {
      this.dataSource = updatedProductes;
    });
    
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '450px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after closing the dialog
    });
  }
  ngOnDestroy(): void {
    this.productService.productsUpdated.unsubscribe();
  }
}
