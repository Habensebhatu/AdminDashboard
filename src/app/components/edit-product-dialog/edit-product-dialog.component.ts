import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/class/category.class';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/class/class';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent {
  productForm: FormGroup;
  categories: Category[] = [];

  constructor(public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private categoryService: CategoryService,
    private productService: ProductService) {
    this.productForm = this.fb.group({
      title: [data.title],
      price: [data.price],
      category: [data.category],
      description: [data.description],
      image: ['',]
    });
  }
  ngOnInit(): void {
    this.categories = this.categoryService.getCatogories();
  }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  save() {
    if (this.selectedFile) {
      const product = new Product(this.productForm.value);
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () =>{
        product.imageUrl = reader.result as string;
        product.id = this.data.id
        this.dialogRef.close(product);
      };
    }
  }

}
