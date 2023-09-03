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

selectedFiles: File[] = [];

onFilesSelected(event: any) {
  let fileList: FileList = event.target.files;
  
  if(fileList.length > 0) {
      for(let i = 0; i < fileList.length; i++) {
          this.selectedFiles.push(fileList[i]);
      }
  }

  console.log("Files:", this.selectedFiles);
}


addProduct(): void {
  if (this.selectedFiles && this.selectedFiles.length) {
    const product = new Product(this.productForm.value);
    let selectedCategory = this.productForm.get('category')!.value;
    product.categoryName = selectedCategory.name;
    product.categoryId = selectedCategory.categoryId;
    selectedCategory.quantityProduct += 1;
    const formData = new FormData();

    this.selectedFiles.forEach((file) => {
      formData.append("files", file);
  });
  

    formData.append('product', JSON.stringify(product));
    console.log("imageWatch", formData)
   
    this.productService.setProducts(formData).pipe(takeUntil(this.unsubscribe$))
    .subscribe({
        next: (addedProduct: Product) => {
            this.productService.addProductToCache(addedProduct);
            this.categoryService.updateCategory(selectedCategory).pipe(takeUntil(this.unsubscribe$))
                .subscribe({
                    next: (next) => {
                        this.dialogRef.close();
                    }
                });
        }
    });
  }
}


getCatogories(){
  this.categoryService.getCatogories().pipe(takeUntil(this.unsubscribe$))
  .subscribe((data: Category[]) => {
    console.log(data)
    this.categories = data;

  });;
}

}
