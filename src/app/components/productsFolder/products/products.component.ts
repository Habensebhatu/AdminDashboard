import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/class/class';
import { ProductService } from 'src/app/service/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy  {
  private unsubscribe$ = new Subject<void>();
  constructor(private router: Router, private productService: ProductService, public dialog: MatDialog, private categoryService: CategoryService) {}
  
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
  this.getProducts();
    // this.productService.productsUpdated.subscribe(updatedProductes => {
    //   this.dataSource = updatedProductes;
    //   console.log("updatedProductes", updatedProductes);
    // });
    
  }
  getProducts(){
    this.productService.getProducts().pipe(takeUntil(this.unsubscribe$))
    .subscribe((data: Product[]) => {
      this.dataSource = data;
    });;
  }
  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '450px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProducts()
      
    });
  }

  openConfirmDialog(category: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove(category);
      }
    });
  }

 

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(EditProductDialogComponent , {
      data: product,
      width: '450px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.findIndex(cat => cat.productId === product.productId);
        if (index !== -1) {
          this.dataSource[index] = { ...product, ...result };
          this.productService.updateProduct(this.dataSource[index]).pipe(takeUntil(this.unsubscribe$))
          .subscribe({
              next: (next) => {
                this.getProducts();
      
              }
          });
        }
      }
    });
  }
 

  
    remove(product: Product) {
    var productId =  product.categoryId 
    this.productService.removeProducts(product).pipe(takeUntil(this.unsubscribe$))
    .subscribe({
        next: (next) => {
          this.categoryService.getCategoryById(productId).pipe(takeUntil(this.unsubscribe$))
    .subscribe({
        next: (category) => {
         category.quantityProduct -= 1;
         this.categoryService.updateCategory(category).pipe(takeUntil(this.unsubscribe$))
         .subscribe({
             next: (next) => {
               console.log("categpry", next)
               this.getProducts();
             }
         });
         
        }
    });
        }
    });
   
    
  }
  ngOnDestroy(): void {
    // this.productService.productsUpdated.unsubscribe();
   
  }
}
