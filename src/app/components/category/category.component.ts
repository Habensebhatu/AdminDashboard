import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { Category } from 'src/app/class/category.class';
import { CategoryService } from 'src/app/service/category.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';




@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router,  private categoryService: CategoryService ){

  }

  displayedColumns = ['CATEGORIES', 'QuantityProduct', 'action'];
  dataSource :Category[]  = [];
  showCard = false;

  ngOnInit(): void {
    this.dataSource = this.categoryService.getCatogories();
    this.categoryService.categoriesUpdated.subscribe(updatedCategories => {
      this.dataSource = updatedCategories;
    });
   
  }
  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '450px',
      height: '350px',
      data: {name: '', }
    })

  }

  openConfirmDialog(category: Category): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove(category);
      }
    });
  }

  edit(category: Category) {
    // Code to edit the category
  }

  remove(category: Category) {
    console.log('tegs', category)
    this.categoryService.removeCategory(category);
  }
}
