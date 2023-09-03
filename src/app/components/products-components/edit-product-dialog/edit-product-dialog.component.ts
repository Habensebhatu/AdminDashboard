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
  displayedImages: { url: string, isNew: boolean }[] = [];
  constructor(public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product, private fb: FormBuilder, private categoryService: CategoryService,
    private productService: ProductService) {
      // Map each URL to the new object structure
      this.displayedImages = data.imageUrls.map(url => ({ url: url, isNew: true }));
      
      this.productForm = this.fb.group({
          title: [data.title],
          price: [data.price],
          category: [data.categoryName],
          description: [data.description],
          image: [data.imageUrls]  // This remains unchanged if your form still expects a string[]
      });
}

  ngOnInit(): void {
    this.getCatogories();
  }

  getCatogories(){
    this.categoryService.getCatogories().pipe(takeUntil(this.unsubscribe$))
    .subscribe((data: Category[]) => {
      this.categories = data;
    });;
  }
  selectedFiles: File[] = [];

  async  onFilesSelected(event: any) {
  let fileList: FileList = event.target.files;
  
  if(fileList.length > 0) {
      for(let i = 0; i < fileList.length; i++) {
          this.selectedFiles.push(fileList[i]);
          const fileUrl = await this.readFileAsDataURL(fileList[i]);
          this.displayedImages.push({ url: fileUrl, isNew: false });
      }
  }
}
removeDisplayedImage(index: number) {
  this.displayedImages.splice(index, 1);

}


async replaceDisplayedImage(event: any, index: number) {
  const fileList: FileList = event.target.files;
  if (fileList.length > 0) {
      const fileUrl = await this.readFileAsDataURL(fileList[0]);
      this.displayedImages[index] = { url: fileUrl, isNew: false };
      this.selectedFiles[index] = fileList[0];
  }
}

readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
  });
}
triggerFileInput(event: any, index: number) {
  // Find the nearest file input and trigger its click event
  const fileInput = event.target.nextElementSibling;
  fileInput.click();
}


 save() {
  const product = new Product(this.productForm.value);
  let selectedCategory = this.productForm.get('category')!.value;
  product.categoryName = selectedCategory.name;
  product.productId = this.data.productId
  product.categoryId = this.data.categoryId
  product.categoryName = selectedCategory
  const formData = new FormData();
  formData.append("product", JSON.stringify(product));
  this.selectedFiles.forEach((newImage) => {
    formData.append("newImages", newImage);
  });
  console.log(" this.selectedFiles",  this.selectedFiles)
  const existingImages = this.displayedImages.filter(img => img.isNew).map(img => img.url)
  console.log(" existingImages",  existingImages)
  formData.append("existingImages", JSON.stringify(existingImages));
  this.dialogRef.close(formData);
}
  
}


