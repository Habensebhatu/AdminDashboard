import { Product } from "./class";

export class Order {
    id: number;
    customerId: number;
    products: Product[];
    dateOrdered: Date;
    status: string;
    total: number;
    
    constructor(orderInfo: any) {
      this.id = orderInfo.id;
      this.customerId = orderInfo.customerId;
      this.products = orderInfo.products;
      this.dateOrdered = new Date();
      this.status = orderInfo.status || 'pending';
      this.total = this.calculateTotal();
    }
  
    calculateTotal(): number {
      return this.products.reduce((total, product) => total + product.price, 0);
    }
  }
  