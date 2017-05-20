import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider} from '../../providers/auth/auth';
import { TabsPage} from '../tabs/tabs';
import { RegistrationModalPage } from '../registration-modal/registration-modal';
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
  providers: [AuthProvider]
})
export class LoginPage {
  email = null;
  password = null;
  songs ={};

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, public modalCtrl: ModalController ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login() {
    this.auth.signIn(this.email, this.password);
  }

  showRegistrationModal() {
    let registrationModal = this.modalCtrl.create(RegistrationModalPage)
    registrationModal.present();
  }

}
