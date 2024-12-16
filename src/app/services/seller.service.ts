import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  //rxjs- (Reactive Extensions for JavaScript) is a library for reactive programming using observables that makes it easier to compose asynchronous or callback-based code
isSellerLoggedIn = new BehaviorSubject<boolean>(false); // is a special type of RxJS Subject that holds and emits the current value to new subscribers. It's like a variable that can be observed, allowing components to share data and react to changes.
isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data:signUp){
   // console.warn("service called")
   return this.http.post('http://localhost:3000/seller',data,{observe:'response'}).subscribe((result)=>{
   console.warn(result)
   if(result){
   this.isSellerLoggedIn.next(true)
   const responseBody = result.body;
   localStorage.setItem('seller',JSON.stringify(responseBody));
   this.router.navigate(['seller-home']);

   }
   })
  }
  reloadSeller(){
if(localStorage.getItem('seller')){
  this.isSellerLoggedIn.next(true)
}
  }
  userLogin(data:login){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{
      observe:'response'}).subscribe((result:any)=>{
       console.warn(result)
       if(result && result.body && result.body.length===1){
        this.isLoginError.emit(false);
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
       }
       else{
        console.warn("login failed!")
        this.isLoginError.emit(true);
       }

      })

  }
}

// if we want to check the data properly in a result, we have to write property, "observe" and it's value is response- means we want to observe response and iterate it properly
