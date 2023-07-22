import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddCategoryDialogComponent } from '../categries/add-category-dialog/add-category-dialog.component';


export interface Element {
  CATEGORIES: string;
  QuantityProductOfCatogry: string;
}

const ELEMENT_DATA: Element[] = [
  {CATEGORIES: 'food', QuantityProductOfCatogry: '1'},

];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public dialog: MatDialog, private router: Router){

  }

  displayedColumns = ['CATEGORIES', 'QuantityProductOfCatogry'];
  dataSource = ELEMENT_DATA;
  showCard = false;

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '250px',
      data: {name: '', quantity: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.push({CATEGORIES: result.name, QuantityProductOfCatogry: result.quantity});
        this.dataSource = [...this.dataSource];
      }
    });
  }

  viewProducts(category: string): void {
    this.router.navigate(['/products', category]);
  }

 
}
