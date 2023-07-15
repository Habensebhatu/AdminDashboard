import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/class/category.class';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/class/class';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent {
  productForm: FormGroup;
  categories: Category[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product, private fb: FormBuilder, private categoryService: CategoryService,
    private productService: ProductService) {
    this.productForm = this.fb.group({
      title: [data.title],
      price: [data.price],
      category: [data.categoryName],
      description: [data.description],
      image: ['',]
    });
  }
  ngOnInit(): void {
    this.getCatogories();
  }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  getCatogories(){
    this.categoryService.getCatogories().pipe(takeUntil(this.unsubscribe$))
    .subscribe((data: Category[]) => {
      this.categories = data;
    });;
  }

  save() {
    if (this.selectedFile) {
      const product = new Product(this.productForm.value);
      let selectedCategory = this.productForm.get('category')!.value;
      product.productId = this.data.productId
      product.categoryId = this.data.categoryId
      product.categoryName = selectedCategory
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      product.imageUrl = formData;
      this.dialogRef.close(product);
     
    }
  }
  

  // save() {
  //   if (this.selectedFile) {
  //     const product = new Product(this.productForm.value);
  //     const test = this.productForm.get('category')!.value
  //     let reader = new FileReader();
  //     reader.readAsDataURL(this.selectedFile);
  //     reader.onload = () =>{
  //       product.imageUrl = reader.result as string;
  //       product.productId = this.data.productId
  //       product.categoryId = this.data.categoryId
  //       product.categoryName = test
  //       console.log("test", test)
  //       console.log("prrrr",product);
  //       this.dialogRef.close(product);
  //     };
  //   }
  // }

}
