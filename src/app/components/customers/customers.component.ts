import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Customer } from 'src/app/class/customer.class';
import { Order } from 'src/app/class/order.class';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  displayedColumns: string[] = ['fullname',"email", "phoneNumber", "adress", "zipCode", "residence"];
  dataSource: Customer[] = [];  // replace with actual data
  private unsubscribe$ = new Subject<void>();
 

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(){
    this.customerService.getCustomer().pipe(takeUntil(this.unsubscribe$))
    .subscribe((customer: Customer[]) => {
      console.log(customer)
   
      this.dataSource = customer;
  
    });;
  }
 
}
