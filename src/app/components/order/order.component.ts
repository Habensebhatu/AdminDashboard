import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Order } from 'src/app/class/order.class';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  displayedColumns: string[] = ['id', 'customerId', 'dateOrdered', 'total', 'moreDetails'];
  dataSource: Order[] = [];  // replace with actual data
  private unsubscribe$ = new Subject<void>();
acc: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(){
    this.orderService.getOrders().pipe(takeUntil(this.unsubscribe$))
    .subscribe((orders: Order[]) => {
      console.log(orders)
     orders
      this.dataSource = orders;
  
    });;
  }
  computeTotal(orderDetails: any[]): number {
    return orderDetails.reduce((acc, item) => acc + item.amountTotal, 0);
  }

  computeTotalQuantity(orderDetails: any[]): number {
    return orderDetails.reduce((acc, item) => acc + item.quantity, 0);
  }
  

}
