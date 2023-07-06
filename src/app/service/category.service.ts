import { Injectable } from '@angular/core';
import { Category } from '../class/category.class';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [];
categoriesUpdated = new Subject<Category[]>();
private readonly apiUrl = 'https://localhost:7087/api/Category';

constructor(private http: HttpClient) {

}


setCatogories(category: Category): Observable<Category>{
  this.categories.push(category);
  // localStorage.setItem('categories', JSON.stringify(this.categories));
  this.categoriesUpdated.next([...this.categories]);
  return this.http.post<Category>(this.apiUrl, category);
 
  
    
}


getCatogories(): Observable<Category[]> {
  const observable = this.http.get<Category[]>(this.apiUrl);

  observable.subscribe({
    next: categories => {
      this.categories = categories;
      // localStorage.setItem('categories', JSON.stringify(categories));
    },
    error: error => {
      console.error('Error getting categories: ', error);
    }
  });

  return observable;
}

// getCatogories(): Observable<Category[]>{
//   // const storedCategories = localStorage.getItem('categories');
//   // if (storedCategories) {
//   //   this.categories = JSON.parse(storedCategories);
//   // }
//   // return [...this.categories];
//   return this.http.get<Category[]>(this.apiUrl);
  
// }

getCategoryById(id: string): Observable<Category> {
   console.log('gegete', id)
  return this.http.get<Category>(`${this.apiUrl}/${id}`);
}
removeCategory(category: Category):Observable<Category> {
  // let categories = this.getCatogories();
  // categories = categories.filter(cat => cat.Name !== category.Name);
  // localStorage.setItem('categories', JSON.stringify(categories));
  // this.categoriesUpdated.next(categories);
  return this.http.delete<Category>(`${this.apiUrl}/${category.categoryId}`);
}

updateCategory(category: Category):Observable<Category> {
//   const index = this.categories.findIndex(cat => cat.categoryId === category.categoryId);
//   if (index !== -1) {
//     this.categories[index] = category;
//   }
//   localStorage.setItem('categories', JSON.stringify([...this.categories]));
//   this.categoriesUpdated.next([...this.categories]);
// }
 return this.http.put<Category>(`${this.apiUrl}/${category.categoryId}`, category);
}
}
