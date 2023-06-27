import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/class/class';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
ngOnInit(): void {
  
}

selectedFile: File | null = null;


onFileSelected(event : any) {
  this.selectedFile = <File>event.target.files[0];
  console.log(this.selectedFile)
}

addProduct(): void {
  if (this.selectedFile) {
    const product = new Product(this.productForm.value);
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () =>{
      product.imageUrl = reader.result as string;
      var category = this.productForm.get('category')!.value;
      this.productService.setProducts(product);
      this.router.navigate(['/products',category]);
    };
  }
}
}
