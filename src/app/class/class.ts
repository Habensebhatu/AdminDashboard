import { v4 as uuidv4 } from 'uuid';

export class Product {
      public id: string;
      public title: string;
      public price: number;
      public category: string;
      public description: string;
      public imageUrl: string

      constructor(data: any) {
        this.id = uuidv4();
        this.title = data.title;
        this.price = data.price;
        this.category = data.category;
        this.description = data.description;
        this.imageUrl = data.imageUrl;

    }

  }