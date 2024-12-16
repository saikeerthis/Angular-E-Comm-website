import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
menuType:string = 'default';
sellerName : string= "";
userName : string= "";
searchResult:undefined|product[];
cartItems = 0;

  constructor(private route:Router, private product : ProductService){}

  ngOnInit(): void {
      this.route.events.subscribe((val: any)=>{
        if(val.url){
          if(localStorage.getItem('seller') && val.url.includes('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
           this.menuType = "seller";
          }
          else if(localStorage.getItem('user')){
             let userStore = localStorage.getItem('user');
             let userData = userStore && JSON.parse(userStore);
             this.userName = userData.name;
             this.menuType = 'user';
             this.product.getCartList(userData.id);
          }
          else{
            this.menuType = "default";
          }
        }
      });
      let cartData = localStorage.getItem('localCart');
      if(cartData){
        this.cartItems = JSON.parse(cartData).length;
      }
      this.product.cartData.subscribe((items)=> {
      this.cartItems = items.length;
      })
  }
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userAuth(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
//   searchProduct(query : KeyboardEvent){
//   if(query){
//   const element = query.target as HTMLInputElement;
//   console.log(element.value);
//   this.product.searchProduct(element.value).subscribe((result)=>{
//     console.log(result);
//     if(result.length > 5){
//       result.length = length;
//     }
//     this.searchResult = result;
//   })
// }
//   }

  searchProduct(query : KeyboardEvent) {
    if(query){
      const element = query.target as HTMLInputElement;
      const searchTerm = element.value.trim().toLowerCase();

      if(searchTerm){
        this.product.searchProduct(searchTerm).subscribe((result) => {
          console.log(result);
          if(result.length > 5){
            result.length = 5;
          }
          this.searchResult = result;
        });
      }
      else if(localStorage.getItem('user'))
       {
        let userStore = localStorage.getItem('user');
        let userData = userStore && JSON.parse(userStore);
        this.userName = userData.name;
        this.menuType = 'user';

       }
      else {
        this.searchResult = [];
      }
    }
  }
  hideSearch(){
    this.searchResult = undefined;
  }
  redirectToDetails(id:string){
    this.route.navigate(['/details/'+id]);
  }
  submitSearch(val:string){
this.route.navigate([`search/${val}`]);
  }
}
