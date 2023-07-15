import { v4 as uuidv4 } from 'uuid';

export class Product {
      public productId: string;
      public categoryId: string;
      public title: string;
      public price: number;
      public categoryName: string;
      public description: string;
      public imageUrl: FormData

      constructor(data: any) {
        this.productId = uuidv4();
        this.categoryId = data.categoryId
        this.title = data.title;
        this.price = data.price;
        this.categoryName = data.categoryName;
        this.description = data.description;
        this.imageUrl = data.imageUrl;

    }

  }