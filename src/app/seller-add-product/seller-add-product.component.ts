import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit{
productList : undefined | product [];
addProductMessage : string | undefined;
  constructor(private product : ProductService,private router: Router) {}

  ngOnInit(): void {

  }
  submit(data:product){
  this.product.addProduct(data).subscribe((result)=>{
    if(result){
      this.addProductMessage = "Product is added successfully!";
    }
  });
  setTimeout(() => {
    this.addProductMessage = undefined;
    this.router.navigate(['seller-home']);
  }, 1000);
  }
  resetForm(){

  }
  list(){
    this.product.productList().subscribe((result) => {
      if(result){
        this.productList = result;
      }
      });
  }
}
