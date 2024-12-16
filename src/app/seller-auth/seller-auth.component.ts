import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { login, signUp } from '../data-type';
import { Router } from '@angular/router'

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  showLogin = false;
  authError:String='';
  constructor(private seller:SellerService){}

// subscribe is used to get data from service, like function is there in one place but used in different places, so subscribe option will get the data from service
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signUp(data:signUp):void{
    console.warn(data)
    this.seller.userSignUp(data);
    // .subscribe((result)=>{
    //   if(result){
    //     this.router.navigate(['seller-home']);
    //   }
    // })
  }
  login(data:login):void{
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError)
    this.authError="Email or password is incorrect";
    })
  }
  openLogin(){
    this.showLogin = true;
  }
  openSignUp(){
    this.showLogin = false;
  }
}
