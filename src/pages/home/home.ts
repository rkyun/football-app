import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireDatabase]
})
export class HomePage {
  list: FirebaseListObservable<any>;
 
  message={
    name: null,
    time: null
  };

  

  constructor(public navCtrl: NavController, public db: AngularFireDatabase) {
    
    //window.localStorage.removeItem('currentUser');
    if(!this.isLogged()){
      console.log('You are not logged in');
      this.navCtrl.push(LoginPage);
    } else{
      this.list = db.list('/test');
      console.log(this.list);
      this.message.time=new Date().getTime();
      this.list.push(this.message);
    }
  }

  isLogged(){
    if(window.localStorage.getItem('currentUser')){
      return true;
    }
  }

  addItem(){

    this.message.time=new Date().getTime();
    this.list.push(this.message);
    
  }

}
