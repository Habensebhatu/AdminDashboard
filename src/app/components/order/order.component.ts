import { Component } from '@angular/core';
import { Order } from 'src/app/class/order.class';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  displayedColumns: string[] = ['id', 'customerId', 'products', 'dateOrdered', 'status', 'total'];
  dataSource: Order[] = [];  // replace with actual data

  constructor() { }

  ngOnInit(): void {
    // this.dataSource = yourService.getOrders(); get your actual data from your service here
  }
}
