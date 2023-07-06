import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/class/category.class';
import { Product } from 'src/app/class/class';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,  private categoryService: CategoryService,
    private productService: ProductService ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
ngOnInit(): void {
  this.getCatogories();
  this.productService.getProducts();
 
}

selectedFile: File | null = null;

onFileSelected(event : any) {
  this.selectedFile = <File>event.target.files[0];
}




addProduct(): void {
  if (this.selectedFile) {
    const product = new Product(this.productForm.value);
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () =>{
      product.imageUrl = reader.result as string;
      let selectedCategory = this.productForm.get('category')!.value;
      product.categoryName = selectedCategory.name
      product.categoryId = selectedCategory.categoryId
      selectedCategory.quantityProduct += 1;
      this.productService.setProducts(product).pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (next) => {
            this.categoryService.updateCategory(selectedCategory).pipe(takeUntil(this.unsubscribe$))
            .subscribe({
              next: (next) => {
                this.dialogRef.close();
              }
            });; 
          
        }
      });
     
    };
  }
}

getCatogories(){
  this.categoryService.getCatogories().pipe(takeUntil(this.unsubscribe$))
  .subscribe((data: Category[]) => {
    console.log(data)
    this.categories = data;

  });;
}

// ngOnDestroy(): void {
//   this.productService.productsUpdated.unsubscribe();
// }
}
