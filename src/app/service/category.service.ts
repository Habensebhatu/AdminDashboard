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
  this.categoriesUpdated.next([...this.categories]); // This should trigger the update
}

getCatogories() {
  const storedCategories = localStorage.getItem('categories');
  if (storedCategories) {
    this.categories = JSON.parse(storedCategories);
  }
  return [...this.categories];
}

removeCategory(category: Category) {
  // Fetch categories from localStorage
  let categories = this.getCatogories();

  // Filter out the category to be removed
  categories = categories.filter(cat => cat.category !== category.category);

  // Update localStorage
  localStorage.setItem('categories', JSON.stringify(categories));

  // Emit updated categories
  this.categoriesUpdated.next(categories);
}

// ... existing code
updateCategory(category: Category) {
  // find index of category to be updated
  const index = this.categories.findIndex(cat => cat.id === category.id);
  if (index !== -1) {
    this.categories[index] = category;
  }
  // publish updated categories to all subscribers
  this.categoriesUpdated.next([...this.categories]);
}
// ... existing code


}
