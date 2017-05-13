import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage {
  email = null;
  password = null;
  songs ={};

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login() {
    
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((response)=>{
      console.log('Login success', JSON.stringify(response));
      let currentUser = {
        email: response.email
      };
      window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.navCtrl.pop();
    }).catch((error=>{
      console.log(error);
    }))
  }

}
