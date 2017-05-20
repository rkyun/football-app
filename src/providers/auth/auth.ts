import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';







/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
  

  constructor(public http: Http, public afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  signIn(email,password) {
    
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then((response)=>{
      console.log('Login success', JSON.stringify(response));
      let currentUser = {
        email: response.email
      };
      window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
      console.log('logged in')
    }).catch((error=>{
      console.log(error);

    }))
  }

  signUp(email,password){
    this.afAuth.auth.createUserWithEmailAndPassword(email,password).then((response)=>{
      console.log('Registration completed')
    }).catch((error=>{
      console.log(error);
    }))
  }

  signOut(){
    this.afAuth.auth.signOut().then((response)=>{
      console.log('logged off')
    });
  }

  getCurrentUser(){
    return this.afAuth.auth.currentUser;
    
  }

  

}
