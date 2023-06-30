import { Injectable } from '@angular/core';
import { Category } from '../class/category.class';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [];
categoriesUpdated = new Subject<Category[]>();

setCatogories(category: Category) {
  this.categories.push(category);
  localStorage.setItem('categories', JSON.stringify(this.categories));
  this.categoriesUpdated.next([...this.categories]); 
}

getCatogories() {
  const storedCategories = localStorage.getItem('categories');
  if (storedCategories) {
    this.categories = JSON.parse(storedCategories);
  }
  return [...this.categories];
}

removeCategory(category: Category) {
  let categories = this.getCatogories();
  categories = categories.filter(cat => cat.category !== category.category);
  localStorage.setItem('categories', JSON.stringify(categories));
  this.categoriesUpdated.next(categories);
}

updateCategory(category: Category) {
  const index = this.categories.findIndex(cat => cat.id === category.id);
  if (index !== -1) {
    this.categories[index] = category;
  }
  localStorage.setItem('categories', JSON.stringify([...this.categories]));
  this.categoriesUpdated.next([...this.categories]);
}

}
