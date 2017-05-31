import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';







/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
 
  users: FirebaseListObservable<any>;
  user={
    id: null,
    name: "Mietek",
    number: "12"
  };

  constructor(public http: Http, public afAuth: AngularFireAuth, public db: AngularFireDatabase ) {
    console.log('Hello AuthProvider Provider');
    this.users = db.list('/users');
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
      this.user.id=response.uid;
      
      this.users.push(this.user).then(() => {
        console.log("custom user registration succes");
      });
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

  getUserByKey(key){
    return this.db.object('/users/'+key);
  }

  

}
