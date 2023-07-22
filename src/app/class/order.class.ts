import { Product } from "./class";
import { OrderDetails } from "./orderDetails.class";


export class Order {
  orderId: number;
    customerId: number;
    products: Product[];
    orderDatails : OrderDetails[];
    dateOrdered: Date;
    status: string;
    total: number;
    name: string;
    
    constructor(orderInfo: any) {
      this.orderId = orderInfo.id;
      this.customerId = orderInfo.customerId;
      this.products = orderInfo.products;
      this.orderDatails = orderInfo.orderDatails;
      this.dateOrdered = new Date();
      this.status = orderInfo.status || 'pending';
      this.total = this.calculateTotal();
      this.name = orderInfo.name;
    }
  
    calculateTotal(): number {
      return this.products.reduce((total, product) => total + product.price, 0);
    }
  }
  