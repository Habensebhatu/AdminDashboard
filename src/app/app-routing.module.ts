import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products-components/products/products.component';
import { AddProductComponent } from './components/products-components/add-product/add-product.component';
import { CategoryComponent } from './components/categries-components/category/category.component';
import { OrderComponent } from './components/orders-components/order/order.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { OrderDetailsComponent } from './components/orders-components/order-details/order-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent, canActivate: [AuthGuard] 
  },
  { path: 'login', component: LoginComponent },

  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories',
    component: CategoryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'order', component: OrderComponent },
  { path: 'order-details/:id', component: OrderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
