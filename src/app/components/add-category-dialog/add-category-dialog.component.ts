import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/class/category.class';
import { DialogData } from 'src/app/model/product.model';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css']
})
export class AddCategoryDialogComponent {
  categoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private fb: FormBuilder, 
    private categoryService: CategoryService 
  ) {
    this.categoryForm = this.fb.group({
      category: ['', Validators.required]
    });
  }

  addCategory(){
    const category = new Category(this.categoryForm.value);
    category.quantityProduct = 0;
    this.categoryService.setCatogories(category);
    this.dialogRef.close(category);
  }
}
