import { v4 as uuidv4 } from 'uuid';

export class Category {
      public id: string;
      public category: string;
      public quantityProduct : number;
     
      constructor(data: any) {
        this.id = uuidv4();
        this.category = data.category;
        this.quantityProduct = data.quantityProduct
       
    }

  }