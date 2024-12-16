import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  productData : undefined | product;
  productQuantity : number = 1;
  cartData : product | undefined;
  removeCart = false;

  constructor(private activeRoute:ActivatedRoute,private product:ProductService) {}

  ngOnInit(): void {
      let productId = this.activeRoute.snapshot.paramMap.get('productId');
      console.log(productId);
      productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData = result;
      let cartData = localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product) => productId === item.id.toString());
        console.log('items',items);
        if(items.length){
          this.cartData = items[0];
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if(user){
        let userId = user && JSON.parse(user);
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result)=>{
        let item = result.filter((item:product) => productId?.toString()===item.productId?.toString())
        if(item.length){
          this.removeCart = true;
        }
        })
      }

      })
  }
  handleQuantity(val:string){
if(this.productQuantity < 20 && val === 'max'){
this.productQuantity += 1;
}
else if(this.productQuantity > 1 && val === 'min'){
  this.productQuantity -= 1;
}
}

addToCart(){
if(this.productData){
  this.productData.quantity = this.productQuantity;
  if(!localStorage.getItem('user')){
    this.product.localAddToCart(this.productData);
    this.removeCart = true;
  }
  else {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user);
    let cartData : cart = {
    ...this.productData,
    productId : this.productData.id,
    userId
    }
    delete cartData.id;
    this.product.addToCart(cartData).subscribe((result)=>{
    if(result){
     this.product.getCartList(userId);
     this.removeCart = true;
     }
    })
  }
}
}
removeToCart(productId:string){
  if(!localStorage.getItem('user')){
this.product.removeItemFromCart(productId);
}
else {
  this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result) => {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user);
    this.product.getCartList(userId);
  })
}
this.removeCart = false;
}
}
