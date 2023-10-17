import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../class/order.class';
import { Observable } from 'rxjs';
import { Customer } from '../class/customer.class';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly apiUrl = 'https://localhost:7087/api/Registration/get-all-users';
  constructor(private http: HttpClient) { }

  getCustomer(): Observable<Customer[]>{
    const observable = this.http.get<Customer[]>(this.apiUrl);
     observable.subscribe({
       next: order => {
        console.log(order)
       },
       error: error => {
         console.error('Error getting categories: ', error);
       }
     });
   
     return observable;
     }

    
}
