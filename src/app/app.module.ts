import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AddCategoryDialogComponent } from './components/add-category-dialog/add-category-dialog.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductService } from './service/product.service';
import { CategoryComponent } from './components/category/category.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EditCategoryDialogComponent } from './components/edit-category-dialog/edit-category-dialog.component';
import { EditProductDialogComponent } from './components/edit-product-dialog/edit-product-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AddCategoryDialogComponent,
    ProductsComponent,
    AddProductComponent,
    CategoryComponent,
    ConfirmDialogComponent,
    EditCategoryDialogComponent,
    EditProductDialogComponent,
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTreeModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatTreeModule,
    MatSelectModule
    
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
